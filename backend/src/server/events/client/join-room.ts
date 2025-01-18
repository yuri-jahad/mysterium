import type { ServerWebSocket } from "bun";
import type { JoinRoom } from "@/server/events/types/join-room";
import { gamesManager } from "@/core/games-manager-instance";

export default function joinRoom(ws: ServerWebSocket, data: JoinRoom) {
  //gamesManager.addRoom();
}
