import type { ServerWebSocket } from "bun";
import RoutesManager from "@/router/registry/route-manager";
import loadData from "@/games/bombparty/data/load-data";
import routes from "@/router";
import createRoom from "@/server/events/client/create-room";
import broadcastRooms from "./events/server/broadcast-rooms";
/**
 * HTTP request handler for the server
 */
const handleHttpRequest =
  (router: RoutesManager) =>
  async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const pathname = url.pathname.slice(1);
    const method = req.method.toLowerCase() as "get" | "post";

    const handler = router.get(method, pathname);
    if (!handler) {
      return new Response("Route not found", { status: 404 });
    }

    try {
      const result = await handler(req);
      // Si le handler retourne null, on continue
      return result || new Response("Not found", { status: 404 });
    } catch (error) {
      console.error(`Error handling route ${pathname}:`, error);
      return new Response("Internal Server Error", { status: 500 });
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
      ws.send(JSON.stringify({
        type:"BROADCAST_ROOMS", 
        ...broadcastRooms()
      }))
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
