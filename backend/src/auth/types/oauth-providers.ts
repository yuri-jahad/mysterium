export type OAuthProviders = {
  discord: {
    id: string;
    avatar: string;
    username: string;
  };
  google: {
    id: string;
    picture: string;
    name: string;
  };
  twitch: {
    data: [
      {
        id: string;
        avatar: string;
        login: string;
      }
    ];
  };
  github: {
    id: number;
    avatar: string;
    login: string;
  };
};

export type OAuthProvidersKeys = keyof OAuthProviders;
