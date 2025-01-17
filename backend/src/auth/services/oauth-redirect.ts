import type { OAuthConfig } from "@/auth/types/oauth-normalized";
import type { OAuthProvidersKeys } from "@/auth/types/oauth-providers";

export default class OAuthRedirectService {
  public createRedirect(
    config: OAuthConfig[OAuthProvidersKeys],
    provider: OAuthProvidersKeys
  ): string {
    const authUrl = new URL(config.authUrl);

    authUrl.searchParams.append("client_id", config.clientId);
    authUrl.searchParams.append(
      "redirect_uri",
      `${process.env.BASE_URL}/auth/${provider}/callback`
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", config.scopes.join(" "));
    return authUrl.toString();
  }
}
