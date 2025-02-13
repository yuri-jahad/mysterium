import { assign, fromPromise, setup } from "xstate";
import { getAuthUser } from "@/auth/hooks/useAuthRegister";
import type { RoomInfos } from "@/websocket/types/client/room";
import { UserAuth } from "@/auth/types/user";
import { envConfig } from "@/env-config";
import { saveToLocalStorage } from "@/utils/local-storage";

export type Services = "discord" | "twitch" | "github" | "google" | null;

interface AuthService extends UserAuth {
  provider: Services;
}

type Context = {
  auth: AuthService;
  rooms: RoomInfos[];
  error: string | null;
};

type Events =
  | { type: "AUTH.SERVICE"; service: Services }
  | { type: "START_AUTH" }
  | { type: "SOCKET.CONNECT" }
  | { type: "SOCKET.CONNECTED" }
  | { type: "SOCKET.ERROR"; error: unknown }
  | { type: "SOCKET.DISCONNECT" }
  | { type: "ROOMS.UPDATE"; rooms: RoomInfos[] };

const socketMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actors: {
    authenticate: fromPromise(async () => {
      console.log("Starting fetch...");
      const response = await fetch(`${envConfig.server}/auth/login`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Auth failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetch successful:", data);
      return data;
    }),
  },
}).createMachine({
  id: "websocket",
  initial: "connected",
  context: {
    auth: {
      provider: null,
      ...getAuthUser(),
    },
    rooms: [],
    error: null,
  },
  states: {
    connected: {
      on: {
        "AUTH.SERVICE": {
          actions: ({ event }) => {
            const authUrl = `${envConfig.server}/auth/${event.service}`;
            window.location.href = authUrl;
          },
        },
        START_AUTH: {
          target: "authenticating",
        },
      },
    },

    authenticating: {
      invoke: {
        src: "authenticate",
        onDone: {
          target: "connected",
          actions: [
            assign(({ context, event }) => ({
              auth: {
                ...context.auth,
                ...event.output,
              },
            })),
            ({ context, event }) => {
              saveToLocalStorage("mysterium", {
                ...context.auth,
                ...event.output,
                provider: event.output.provider || null,
              });
            },
          ],
        },
        onError: {
          target: "connected",
          actions: [
            assign({
              auth: () => ({
                ...getAuthUser(),
                provider: null,
              }),
            }),
          ],
        },
      },
    },
  },
});

export default socketMachine;
