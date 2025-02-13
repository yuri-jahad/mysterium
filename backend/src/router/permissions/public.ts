import type { RoutesCollection } from "@/router/types/routes";
import createOAuthHandler from "@/auth/controllers/oauth-redirect";
import createOAuthCallbackHandler from "@/auth/controllers/oauth-callback";
import createOAuthLogin from "@/auth/controllers/oauth-login";

const publicRoutes: RoutesCollection = [
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
  {
    method: "get",
    key: "auth/login",
    handler: createOAuthLogin(),
  },
];

export default publicRoutes;
