import type { RouteHandler } from "@/router/types/routes";
import { oauthGuard } from "@/auth/guards/oauth-guard";

export default function oauthLogin(): RouteHandler {
  return async (req: Request) => {
    const authData = await oauthGuard(req);
    if (authData instanceof Response) return authData;
    return Response.json(authData);
  };
}
