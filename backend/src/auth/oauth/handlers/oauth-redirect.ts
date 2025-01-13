import type { RouteHandler } from "@/shared/types/routes";
import type { OAuthProvidersKeys } from "@/shared/types/oauth-providers";
import { oauthProviders } from "@/auth/oauth/providers/oauth";
import OAuthRedirectService from "@/auth/oauth/services/oauth-redirect";
/**
 * Generic OAuth handler that works with multiple providers
 * @see https://oauth.net/2/
 */

const oauthRedirectService = new OAuthRedirectService();

const oAuthRedirectHandler =
  (provider: OAuthProvidersKeys): RouteHandler =>
  (req: Request) => {
    const authUrl = oauthRedirectService.createRedirect(
      oauthProviders[provider],
      provider
    );

    return Response.redirect(authUrl);
  };

export default oAuthRedirectHandler;
