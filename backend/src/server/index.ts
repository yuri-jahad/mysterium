import type { ServerWebSocket } from "bun";
import RoutesManager from "@/router/registry/route-manager";
import loadData from "@/games/bombparty/data/load-data";
import routes from "@/router";
import createRoom from "@/server/events/client/create-room";
import broadcastRooms from "./events/server/broadcast-rooms";

// Fonction utilitaire pour ajouter les en-têtes CORS
const addCorsHeaders = (response: Response): Response => {
  // Si c'est une redirection, retourner la réponse telle quelle
  if (
    response.status === 301 ||
    response.status === 302 ||
    response.status === 303 ||
    response.status === 307 ||
    response.status === 308
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", import.meta.env.FRONTEND_URL || "");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
};
/**
 * HTTP request handler for the server
 */
const handleHttpRequest =
  (router: RoutesManager) =>
  async (req: Request): Promise<Response> => {
    // Gérer les requêtes OPTIONS pour le CORS preflight
    
    const url = new URL(req.url);
    const pathname = url.pathname.slice(1);
    const method = req.method.toLowerCase() as "get" | "post";
    if (req.method.toLowerCase() === "options") {
      return addCorsHeaders(new Response(null, { status: 204 }));
    }

    const handler = router.get(method, pathname);
    if (!handler) {
      return addCorsHeaders(new Response("Route not found", { status: 404 }));
    }

    try {
      const result = await handler(req);
      if (!result) {
        return addCorsHeaders(new Response("Not found", { status: 404 }));
      }
      return addCorsHeaders(result);
    } catch (error) {
      console.error(`Error handling route ${pathname}:`, error);
      return addCorsHeaders(
        new Response("Internal Server Error", { status: 500 })
      );
    }
  };

// Initialize router
const router = new RoutesManager().register(routes);

// Start server
Bun.serve({
  fetch(req: Request, server): Response | Promise<Response> {
    const success = server.upgrade(req);
    if (success) {
      return new Response(null, { status: 101 });
    }
    return handleHttpRequest(router)(req);
  },
  websocket: {
    open(ws: ServerWebSocket<unknown>) {
      console.log("client connecté !");
      ws.send(
        JSON.stringify({
          type: "BROADCAST_ROOMS",
          ...broadcastRooms(),
        })
      );
    },
    async message(ws: ServerWebSocket<unknown>, message: string | Buffer) {
      console.log(`Message reçu: ${message}`);
      const messageString =
        message instanceof Buffer ? message.toString("utf-8") : message;

      const parsedMessage = JSON.parse(messageString);
      switch (parsedMessage.type) {
        case "CREATE_ROOM":
          createRoom(parsedMessage, ws);
          break;
      }
      ws.send(`Message envoyé au client`);
    },
    close(ws) {
      console.log("le client s'est déconnecté !");
    },
  },
});
