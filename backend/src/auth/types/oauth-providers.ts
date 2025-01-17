export type OAuthProviders = {
  discord: {
    id: string;
    email: string;
    username: string;
  };
  google: {
    id: string;
    email: string;
    name: string;
  };
  twitch: {
    data: [
      {
        id: string;
        email: string;
        login: string;
      }
    ];
  };
  github: {
    id: number;
    email: string;
    login: string;
  };
};

export type OAuthProvidersKeys = keyof OAuthProviders;
