import type { RouteHandler } from "@/router/types/routes";
import { jwtVerify } from "jose";
import type { JWTPayload } from "jose";

interface AuthUser {
  [key: string]: string | number;
}

function convertToAuthUser(payload: JWTPayload): AuthUser {
  const authUser: AuthUser = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string" || typeof value === "number") {
      authUser[key] = value;
    }
  }

  return authUser;
}

/**
 * Authentication middleware that verifies JWT token from cookies
 */
export async function oauthGuard(req: Request): Promise<AuthUser | Response> {
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
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      return convertToAuthUser(payload);
    } catch (error) {
      console.error("Token verification failed:", error);
      return new Response("Invalid Token", { status: 401 });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return new Response("Authentication error", { status: 500 });
  }
}

/**
 * Protects routes by wrapping them with authentication middleware
 */
export function protect(handler: RouteHandler): RouteHandler {
  return async (req: Request) => {
    const authResult = await oauthGuard(req);

    if (authResult instanceof Response) {
      return authResult;
    }

    const enhancedReq = new Request(req.url, {
      ...req,
      headers: new Headers(req.headers),
    });

    Object.defineProperty(enhancedReq, "user", {
      value: authResult,
      writable: false,
    });

    return handler(enhancedReq as Request & { user: AuthUser });
  };
}

export type ProtectedRequest = Request & { user: AuthUser };
