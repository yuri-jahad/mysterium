import type { RouteHandler } from "@/types/routes";
import { jwtVerify } from "jose";

/**
 * Authentication middleware that verifies JWT token from cookies
 */
async function authMiddleware(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    const token = cookieHeader.match(/auth=([^;]+)/)?.[1];
    if (!token) {
      return new Response("No auth Token", { status: 401 });
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return true;
    } catch {
      return new Response("Invalid Token", { status: 401 });
    }
  } catch {
    return new Response("Authentication error", { status: 500 });
  }
}

/**
 * Protects routes by wrapping them with authentication middleware
 */
export function protect(handler: RouteHandler): RouteHandler {
  return async (req: Request) => {
    const authResult = await authMiddleware(req);

    if (authResult === true) {
      return handler(req);
    } else {
      console.log("et NON BOUFFON AHAHA");
    }

    return authResult as Response;
  };
}
