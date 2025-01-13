import type { RouteHandler } from "@/shared/types/routes";
import type { OAuthProvidersKeys } from "@/shared/types/oauth-providers";
import type { OAuthProviderConfig, OAuthConfig } from "@/shared/types/oauth-normalized";
import { oauthProviders } from "@/auth/oauth/providers/oauth";
import OauthCallbackService from "@/auth/oauth/services/oauth-callback";

/**
 * Generic OAuth callback handler
 * @see https://oauth.net/2/
 */

const oauthCallbackService = new OauthCallbackService();

const oAuthCallbackHandler =
  (provider: OAuthProvidersKeys): RouteHandler =>
  async (req: Request) => {
    const config = oauthProviders[provider];

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Missing authorization code", { status: 400 });
    }

    const token = oauthCallbackService.signedToken(config, provider, code);

    try {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/success",
          ...(process.env.NODE_ENV !== "prod"
            ? {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
              }
            : {}),
          "Set-Cookie": `auth=${token}; HttpOnly; Path=/; Max-Age=${
            24 * 60 * 60
          }; SameSite=Strict${
            process.env.NODE_ENV === "prod" ? "; Secure" : ""
          }`,
        },
      });
    } catch (error) {
      console.error(`${provider} auth error:`, error);
      return new Response("Authentication failed", { status: 500 });
    }
  };

export default oAuthCallbackHandler;
