import { createMachine, assign } from "xstate";
import { getAuthUser } from "@/auth/hooks/useAuthRegister";
import type { UserAuth } from "@/auth/types/user";

// Types pour les events websocket
interface BroadcastRoomsEvent {
  type: "BROADCAST_ROOMS";
  rooms: string[];
}

// Types pour la machine
interface RoomContext {
  auth: UserAuth;
  rooms: string[];
}

type RoomEvent =
  | { type: "CONNECT" }
  | { type: "CONNECTED" }
  | BroadcastRoomsEvent;

export const roomMachine = createMachine(
  {
    id: "mysterium",
    initial: "checking",
    context: {
      auth: {
        username: null,
        token: null,
        avatar: null,
      },
      rooms: [],
    } as RoomContext,
    states: {
      checking: {
        entry: assign({
          auth: () => getAuthUser(),
        }),
        on: {
          "": "disconnected",
        },
      },
      disconnected: {
        on: {
          CONNECT: "connecting",
        },
      },
      connecting: {
        on: {
          CONNECTED: "connected",
        },
      },
      connected: {
        on: {
          BROADCAST_ROOMS: {
            actions: [
              assign((context, event) => ({
                ...context,
                rooms: event.rooms,
              })),
            ],
          },
        },
      },
    },
  },
  {
    types: {} as {
      context: RoomContext;
      events: RoomEvent;
    },
  }
);
