import type { OAuthProviders, OAuthProvidersKeys } from "@/shared/types/oauth-providers";

export interface NormalizedUser {
  id: string;
  email: string;
  username: string;
}

export interface OAuthProviderConfig<T extends OAuthProviders[keyof OAuthProviders]> {
  name: string;
  authUrl: string;
  tokenUrl: string;
  userUrl: string;
  scopes: string[];
  clientId: string;
  clientSecret: string;
  getUserData: (data: T) => NormalizedUser;
}

export type OAuthConfig = {
  [K in OAuthProvidersKeys]: OAuthProviderConfig<OAuthProviders[K]>;
};