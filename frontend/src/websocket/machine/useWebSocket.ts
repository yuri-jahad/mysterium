import { setup } from "xstate";
import type { RoomInfos } from "@/websocket/types/client/room.ts";

type Services = "Discord" | "Twitch" | "Github" | "Google" | "Anonyme";

interface AuthService {
  token: string;
  username: string;
  avatar: string;
  service: {
    name: Services;
  }
}

const socketMachine = setup({
  types: {
    context: {} as {
      auth: {
        token: string | null;
        service: AuthService | null;
      } ;
      rooms: RoomInfos[];
      url: string;
      error: string | null;
    },
  },
}).createMachine({
  id: "websocket",
  context: {
    auth: {
      token: null,
      service: null
    },
    rooms: [],
    error: null,
    url: import.meta.env.VITE_LOCAL_SERVER || "ws://localhost:3000",
  },
  states: {},
});
