import type { RouteHandler } from "@/router/types/routes";
import type { OAuthProvidersKeys } from "@/auth/types/oauth-providers";
import { oauthConfig } from "@/auth/config/oauth-config";
import OAuthRedirectService from "@/auth/services/oauth-redirect";
/**
 * Generic OAuth handler that works with multiple providers
 * @see https://oauth.net/2/
 */

const oauthRedirectService = new OAuthRedirectService();

const oAuthRedirectHandler =
  (provider: OAuthProvidersKeys): RouteHandler =>
  (req: Request) => {
    const authUrl = oauthRedirectService.createRedirect(
      oauthConfig[provider],
      provider
    );

    return Response.redirect(authUrl);
  };

export default oAuthRedirectHandler;
