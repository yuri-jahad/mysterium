import { assign, setup } from "xstate";

interface BroadcastRoomsEvent {
  type: "BROADCAST_ROOMS";
  rooms: string[];
}

interface CreateRoomEvent {
  type: "CREATE_ROOM";
  roomName: string;
  gameName: "Bombparty" | "Popsauce";
  isPrivate: boolean;
}

type RoomEvent =
  | { type: "CONNECT" }
  | { type: "CONNECTED" }
  | { type: "DISCONNECTED" }
  | CreateRoomEvent
  | BroadcastRoomsEvent;

const machine = setup({
  types: {
    context: {} as {
      rooms: string[];
      error: string | null;
    },
    events: {} as RoomEvent,
  },
}).createMachine({
  id: "game",
  initial: "idle",
  context: {
    rooms: [],
    error: null,
  },
  states: {
    idle: {
      on: {
        CONNECT: "connecting",
      },
    },
    connecting: {
      on: {
        CONNECTED: "connected",
        DISCONNECTED: {
          target: "disconnected",
          actions: assign({
            error: () => "La connexion a échoué",
          }),
        },
      },
    },
    connected: {
      on: {
        BROADCAST_ROOMS: {
          actions: assign({
            rooms: ({ event }) => {
              if (Array.isArray(event) && event[0]) {
                return event[0];
              }
              return [];
            },
          }),
        },
        CREATE_ROOM: {
          // Ici vous pouvez ajouter des actions pour la création de room
        },
        DISCONNECTED: "disconnected",
      },
    },
    disconnected: {
      on: {
        CONNECT: "connecting",
      },
    },
  },
});

export default machine;
