import type { RouteHandler } from "@/router/types/routes";
import { jwtVerify } from "jose";

/**
 * Authentication middleware that verifies JWT token from cookies
 */
async function oauthGard(req: Request) {
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
    const authResult = await oauthGard(req);

    if (authResult) {
      return handler(req);
    }

    return authResult as Response;
  };
}
