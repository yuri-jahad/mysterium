import type { ServerWebSocket } from "bun";
import type { RoomConfiguration } from "@/core/types/room";
import { gamesManager } from "@/core/games-manager-instance";

export default function createRoom(
  clientRoomConfig: RoomConfiguration,
  ws: ServerWebSocket<unknown>
) {
  gamesManager.addRoom(clientRoomConfig)
}
