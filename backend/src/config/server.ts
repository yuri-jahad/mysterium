import RoutesManager from "@/routes/lib/manager";
import loadData from "@/config/load-data";
import routes from "@/routes";




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
    open (ws) {
      console.log("client connecté !");
    },
    async message(ws, message) {
      console.log(`Message reçu: ${message}`);
      ws.send(`Message envoyé au client`);
    },
    close(ws) {
      console.log("le client s'est déconnecté !")
    }
  },
});
