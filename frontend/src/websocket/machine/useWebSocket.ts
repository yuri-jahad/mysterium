import { getAuthUser } from "@/auth/hooks/useAuthRegister";
import { setup } from "xstate";
import type { RoomInfos } from "@/websocket/types/client/room.ts";
import { UserAuth } from "@/auth/types/user";
import { envConfig } from "@/env-config";

type Services = "Discord" | "Twitch" | "Github" | "Google" | null;

interface AuthService extends UserAuth {
  service: Services;
}

type Context = {
  auth: AuthService;
  rooms: RoomInfos[];
  error: string | null;
};

type Events =
  | { type: "AUTH.SERVICE"; service: Services }
  | { type: "AUTH.SUCCESS"; data: AuthService }
  | { type: "AUTH.ERROR"; error: string }
  | { type: "SOCKET.CONNECT" }
  | { type: "SOCKET.CONNECTED" }
  | { type: "SOCKET.ERROR"; error: string }
  | { type: "SOCKET.DISCONNECT" }
  | { type: "ROOMS.UPDATE"; rooms: RoomInfos[] };

const socketMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
}).createMachine({
  id: "websocket",
  initial: "initializing",
  context: {
    auth: {
      service: null,
      ...getAuthUser(),
    },
    rooms: [],
    error: null,
  },
  states: {
    initializing: {
      on: {
        "AUTH.SERVICE": {
          target: "authenticating",
          actions: ({ context, event }) => {
            if (!event.service) return;
            context.auth.service = event.service;
            window.location.href = `${
              envConfig.server
            }/auth/${event.service.toLowerCase()}`;
          },
        },
      },
    },
    authenticating: {
      entry: async ({ context }) => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const hasAuthParams = urlParams.has("code") || urlParams.has("token");

          if (hasAuthParams) {
            const response = await fetch(`${envConfig.server}/auth/login`, {
              method: "GET",
              credentials: "include",
            });

            if (!response.ok) {
              throw new Error("Authentication failed");
            }

            const userData = await response.json();
            return { type: "AUTH.SUCCESS", data: userData };
          }
        } catch (error) {
          return {
            type: "AUTH.ERROR",
            error:
              error instanceof Error ? error.message : "Authentication failed",
          };
        }
      },
      on: {
        "AUTH.SUCCESS": {
          target: "authenticated",
          actions: ({ context, event }) => {
            context.auth = { ...event.data };
            context.error = null;
          },
        },
        "AUTH.ERROR": {
          target: "error",
          actions: ({ context, event }) => {
            context.error = event.error;
            context.auth.service = null;
          },
        },
      },
    },
    authenticated: {
      on: {
        "SOCKET.CONNECT": "connecting",
        "SOCKET.DISCONNECT": {
          target: "initializing",
          actions: ({ context }) => {
            context.rooms = [];
            context.error = null;
          },
        },
      },
    },
    connecting: {
      entry: ({ context }) => {
        const ws = new WebSocket(`${envConfig.ws}/ws`);

        ws.onopen = () => {
       
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === "auth_success") {
            return { type: "SOCKET.CONNECTED" };
          }
        };

        ws.onerror = () => {
          return { type: "SOCKET.ERROR", error: "WebSocket connection failed" };
        };
      },
      on: {
        "SOCKET.CONNECTED": "connected",
        "SOCKET.ERROR": {
          target: "error",
          actions: ({ context, event }) => {
            context.error = event.error;
          },
        },
      },
    },
    connected: {
      on: {
        "ROOMS.UPDATE": {
          actions: ({ context, event }) => {
            context.rooms = event.rooms;
          },
        },
        "SOCKET.ERROR": {
          target: "error",
          actions: ({ context, event }) => {
            context.error = event.error;
          },
        },
        "SOCKET.DISCONNECT": {
          target: "initializing",
          actions: ({ context }) => {
            context.auth.service = null;
            context.rooms = [];
            context.error = null;
          },
        },
      },
    },
    error: {
      on: {
        "AUTH.SERVICE": "authenticating",
        "SOCKET.CONNECT": "connecting",
      },
    },
  },
});

export default socketMachine;
