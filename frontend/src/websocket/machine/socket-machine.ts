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
  | { type: "SOCKET.ERROR"; error: unknown }
  | { type: "SOCKET.DISCONNECT" }
  | { type: "ROOMS.UPDATE"; rooms: RoomInfos[] }
  | { type: "START_AUTH" }
  | { type: "AUTH.CODE_RECEIVED"; code: string };

const socketMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actors: {
    authenticate: fromPromise(async () => {
      const response = await fetch(`${envConfig.server}/auth/login`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Authentication failed");
      console.log(await response.json())
      return response.json();
    }),
  },
}).createMachine({
  id: "websocket",
  initial: "connecting",
  context: {
    auth: {
      service: null,
      ...getAuthUser(),
    },
    rooms: [],
    error: null,
  },
  states: {
    connecting: {
      entry: ({ context }) => {
        const ws = new WebSocket(`${envConfig.ws}/ws`);

        ws.onopen = () => {
         ;
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
        };

        ws.onerror = () => {
          
        };

        ws.onclose = () => {
          
        };
      },
      on: {
        "SOCKET.CONNECTED": "connected",
        "SOCKET.ERROR": {
          target: "error",
          actions: assign({
            error: ({ event }) => {
              if (typeof event.error === "string") {
                return event.error;
              }
              return "An unknown error occurred";
            },
          }),
        },
      },
    },
    connected: {
      on: {
        "AUTH.SERVICE": {
          actions: ({ context, event }) => {
            if (!event.service) return;
            context.auth.service = event.service;
            window.location.href = `${envConfig.server}/auth/${event.service}`;
          },
        },
        "AUTH.CODE_RECEIVED": {
          target: "authenticating",
        },
        "AUTH.SUCCESS": {
          actions: assign({
            auth: ({ event }) => ({
              ...event.data,
              error: null,
            }),
          }),
        },
        "ROOMS.UPDATE": {
          actions: assign({
            rooms: ({ event }) => event.rooms,
          }),
        },
        "SOCKET.ERROR": {
          target: "error",
          actions: assign({
            error: ({ event }) => {
              if (typeof event.error === "string") {
                return event.error;
              }
              return "An unknown error occurred";
            },
          }),
        },
        "SOCKET.DISCONNECT": {
          target: "connecting",
          actions: assign({
            auth: ({ context }) => ({ ...context.auth, service: null }),
            rooms: () => [],
            error: () => null,
          }),
        },
      },
    },
    authenticating: {
      actors: {
        auth: "authenticate",
      },
      on: {
        "AUTH.SUCCESS": {
          target: "connected",
          actions: assign({
            auth: ({ event }) => ({
              ...event.data,
              error: null,
            }),
          }),
        },
        "AUTH.ERROR": {
          target: "error",
          actions: assign({
            error: ({ event }) => {
              if (typeof event.error === "string") {
                return event.error;
              }
              return "An unknown error occurred";
            },
          }),
        },
      },
    },
    error: {
      on: {
        "SOCKET.CONNECT": "connecting",
      },
    },
  },
});

export default socketMachine;
