import type {
  OAuthProviderConfig,
  OAuthConfig,
} from "@/shared/types/oauth-normalized";
import type { OAuthProvidersKeys } from "@/shared/types/oauth-providers";
import { SignJWT } from "jose";

export default class OauthCallbackService {
  private async exchangeCodeForToken(
    config: OAuthConfig[OAuthProvidersKeys],
    code: string,
    provider: OAuthProvidersKeys
  ): Promise<string> {
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(provider === "github" ? { Accept: "application/json" } : {}),
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: `${process.env.BASE_URL}/auth/${provider}/callback`,
      }),
    });
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  }

  public async getUserData(
    config: OAuthConfig[OAuthProvidersKeys],
    provider: OAuthProvidersKeys,
    code: string
  ) {
    const tokenData = await this.exchangeCodeForToken(config, code, provider);
    const userResponse = await fetch(config.userUrl, {
      headers: {
        Authorization: `Baerer ${tokenData}`,
        ...(provider === "twitch" ? { "Client-ID": config.clientId } : {}),
      },
    });
    const userData = await userResponse.json();
    const normalizedUserData = config.getUserData(userData);
    return normalizedUserData;
  }

  async signedToken(
    config: OAuthConfig[OAuthProvidersKeys],
    provider: OAuthProvidersKeys,
    code: string
  ) {
    const normalizedUserData = await this.getUserData(config, provider, code);
    const token = await new SignJWT({
      ...normalizedUserData,
      provider: provider,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return token;
  }
}