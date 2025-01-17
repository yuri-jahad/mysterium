import type { OAuthConfig } from "@/auth/types/oauth-normalized";

export const oauthConfig: OAuthConfig = {
  discord: {
    name: "Discord",
    authUrl: "https://discord.com/api/oauth2/authorize",
    tokenUrl: "https://discord.com/api/oauth2/token",
    userUrl: "https://discord.com/api/users/@me",
    scopes: ["identify", "email"],
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    getUserData: (data) => ({
      id: data.id,
      email: data.email,
      username: data.username,
    }),
  },
  google: {
    name: "Google",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
    scopes: ["email", "profile"],
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    getUserData: (data) => ({
      id: data.id,
      email: data.email,
      username: data.name,
    }),
  },
  twitch: {
    name: "Twitch",
    authUrl: "https://id.twitch.tv/oauth2/authorize",
    tokenUrl: "https://id.twitch.tv/oauth2/token",
    userUrl: "https://api.twitch.tv/helix/users",
    scopes: ["user:read:email"],
    clientId: process.env.TWITCH_CLIENT_ID!,
    clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    getUserData: (data) => ({
      id: data.data[0].id,
      email: data.data[0].email,
      username: data.data[0].login,
    }),
  },
  github: {
    name: "GitHub",
    authUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userUrl: "https://api.github.com/user",
    scopes: ["read:user", "user:email"],
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    getUserData: (data) => ({
      id: data.id.toString(),
      email: data.email,
      username: data.login,
    }),
  },
};
