export type Mode = "prod" | "dev";
export type EnvProps = "server" | "ws";
export type EnvConfig = Record<EnvProps, string>;

const getCurrentEnvConfig = (): EnvConfig => {
  const mode = import.meta.env.VITE_ENV_MODE as Mode; // Utilisation de VITE_ENV_MODE au lieu de VITE_MODE

  // Vérification que le mode est valide
  if (mode !== "prod" && mode !== "dev") {
    console.warn(`Invalid mode: ${mode}, falling back to "dev"`);
    return {
      server: import.meta.env.VITE_LOCAL_SERVER,
      ws: import.meta.env.VITE_LOCAL_WS_SERVER,
    };
  }

  if (mode === "prod") {
    const config = {
      server: import.meta.env.VITE_PROD_SERVER,
      ws: import.meta.env.VITE_PROD_WS_SERVER,
    };

    if (!config.server || !config.ws) {
      throw new Error("Missing production environment variables");
    }

    return config;
  }

  // Mode dev
  const config = {
    server: import.meta.env.VITE_LOCAL_SERVER,
    ws: import.meta.env.VITE_LOCAL_WS_SERVER,
  };

  if (!config.server || !config.ws) {
    console.warn("Missing local environment variables");
  }

  return config;
};

export const envConfig = getCurrentEnvConfig();
