export type OAuthConfig = {
  name: string;
  authUrl: string;
  tokenUrl: string;
  userUrl: string;
  scopes: string[];
  clientId: string;
  clientSecret: string;
  getUserData: (data: any) => {
    id: string;
    email: string;
    username: string;
  };
};
