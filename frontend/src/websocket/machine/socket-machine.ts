import { assign, fromPromise, setup } from "xstate";
import { getAuthUser } from "@/auth/hooks/useAuthRegister";
import type { RoomInfos } from "@/websocket/types/client/room.ts";
import { UserAuth } from "@/auth/types/user";
import { envConfig } from "@/env-config";

export type Services = "discord" | "twitch" | "github" | "google" | null;

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
  | { type: "ROOMS.UPDATE"; rooms: RoomInfos[] }
  | { type: "START_AUTH"; code: string };

const authService = async () => {
  const response = await fetch(`${envConfig.server}/auth/login`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Authentication failed");
  return response.json();
};

const socketMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actors: {
    authenticate: fromPromise(async () => await authService()),
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
            window.location.href = `${envConfig.server}/auth/${event.service}`;
          },
        },
      },
    },
    authenticate: {
      on:{}
    },
    authenticating: {
      invoke: {
        src: "authenticate",
        onDone: {
          target: "authenticated",
          actions: assign({
            auth: ({ event }) => ({
              ...event.output,
              error: null,
            }),
          }),
        },
        onError: {
          target: "error",
          actions: assign({
            error: ({ event }) => event.error.message,
            auth: ({ context }) => ({
              ...context.auth,
              service: null,
            }),
          }),
        },
      },
    },
    authenticated: {
      on: {
        "SOCKET.CONNECT": "connecting",
        "SOCKET.DISCONNECT": {
          target: "initializing",
          actions: assign({
            rooms: () => [],
            error: () => null,
          }),
        },
      },
    },
    connecting: {
      entry: ({ context }) => {
        const ws = new WebSocket(`${envConfig.ws}/ws`);

        ws.onopen = () => {};

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
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    connected: {
      on: {
        "ROOMS.UPDATE": {
          actions: assign({
            rooms: ({ event }) => event.rooms,
          }),
        },
        "SOCKET.ERROR": {
          target: "error",
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
        "SOCKET.DISCONNECT": {
          target: "initializing",
          actions: assign({
            auth: ({ context }) => ({ ...context.auth, service: null }),
            rooms: () => [],
            error: () => null,
          }),
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
