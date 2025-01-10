// machines/roomMachine.ts
import { createMachine } from "xstate";

interface RoomContext {
  roomId: string;
  players: Map<string, Player>;
  host: string | null;
  status: "waiting" | "playing" | "finished";
  socket: WebSocket | null;
}

const roomMachine = createMachine({
  id: "room",
  initial: "connecting",
  context: {
    roomId: "",
    players: new Map(),
    host: null,
    status: "waiting",
    socket: null,
  },
  states: {
    connecting: {
      on: {
        SOCKET_CONNECTED: {
          target: "lobby",
          actions: "assignSocket",
        },
        CONNECTION_ERROR: "error",
      },
    },
    lobby: {
      on: {
        PLAYER_JOIN: {
          actions: "addPlayer",
        },
        PLAYER_LEAVE: {
          actions: "removePlayer",
        },
        START_GAME: "playing",
        SOCKET_DISCONNECTED: "reconnecting",
      },
    },
    playing: {
      on: {
        GAME_EVENT: {
          actions: "handleGameEvent",
        },
        END_GAME: "finished",
        SOCKET_DISCONNECTED: "reconnecting",
      },
    },
    finished: {
      on: {
        RESTART: "lobby",
        LEAVE: "exiting",
      },
    },
    reconnecting: {
      after: {
        5000: "connecting",
      },
    },
    error: {
      on: {
        RETRY: "connecting",
      },
    },
    exiting: {
      type: "final",
    },
  },
});
