import RoutesManager from "@/routes/lib/manager";
import routes from "@/routes";

const router = new RoutesManager().register(routes);

Bun.serve({
  fetch(req: Request, server) {
    const success = server.upgrade(req);
    if (success) return undefined;

    const url = new URL(req.url);
    const pathname = url.pathname.slice(1);
    const method = req.method.toLowerCase() as "get" | "post";

    // Utiliser l'instance existante
    const handler = router.get(method, pathname);
    if (handler) {
      try {
        return handler(req);
      } catch (error) {
        console.error(`Error handling route ${pathname}:`, error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    return new Response("Route not found", { status: 404 });
  },
  websocket: {
    async message(ws, message) {
      console.log(`Message reçu: ${message}`);
      ws.send(`Message envoyé au client`);
    },
  },
});
