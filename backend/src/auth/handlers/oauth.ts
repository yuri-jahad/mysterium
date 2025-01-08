import { SignJWT } from "jose";
import type { RouteHandler } from "@/types/routes";
import { oauthProviders } from "@/auth/providers";

/**
 * Generic OAuth handler that works with multiple providers
 * @see https://oauth.net/2/
 */
export const createOAuthHandler =
  (provider: string): RouteHandler =>
  (req: Request) => {
    const config = oauthProviders[provider];
    const authUrl = new URL(config.authUrl);

    authUrl.searchParams.append("client_id", config.clientId);
    authUrl.searchParams.append(
      "redirect_uri",
      `${process.env.BASE_URL}/auth/${provider}/callback`
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", config.scopes.join(" "));
    console.log(authUrl.toString())
    return Response.redirect(authUrl.toString());
  };

/**
 * Generic OAuth callback handler
 * @see https://oauth.net/2/
 */
export const createOAuthCallbackHandler =
  (provider: string): RouteHandler =>
  async (req: Request) => {
    const config = oauthProviders[provider];
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Missing authorization code", { status: 400 });
    }

    try {
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
          code,
          redirect_uri: `${process.env.BASE_URL}/auth/${provider}/callback`,
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const userResponse = await fetch(config.userUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...(provider === "twitch" ? { "Client-ID": config.clientId } : {}),
        },
      });

      const userData = await userResponse.json();
      console.log(userData)
      const normalizedUserData = config.getUserData(userData);

      const token = await new SignJWT({
        ...normalizedUserData,
        provider,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

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
