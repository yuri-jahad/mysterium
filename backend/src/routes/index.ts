import type { HttpMethod, RouteHandler } from "@/types/routes";
import {
  createOAuthHandler,
  createOAuthCallbackHandler,
} from "@/auth/handlers/oauth";

const routes: Array<{
  method: HttpMethod;
  handler: RouteHandler;
  key: string;
}> = [
  {
    method: "get",
    key: "auth/discord",
    handler: createOAuthHandler("discord"),
  },
  {
    method: "get",
    key: "auth/discord/callback",
    handler: createOAuthCallbackHandler("discord"),
  },
  {
    method: "get",
    key: "auth/google",
    handler: createOAuthHandler("google"),
  },
  {
    method: "get",
    key: "auth/google/callback",
    handler: createOAuthCallbackHandler("google"),
  },
  {
    method: "get",
    key: "auth/github",
    handler: createOAuthHandler("github"),
  },
  {
    method: "get",
    key: "auth/github/callback",
    handler: createOAuthCallbackHandler("github"),
  },

];

export default routes;
