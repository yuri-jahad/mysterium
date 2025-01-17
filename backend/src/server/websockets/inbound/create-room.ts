import type { ServerWebSocket } from "bun";
import type { RoomConfiguration } from "@/core/types/room";

export default function createRoom(
  clientRoomConfig: RoomConfiguration,
  ws: ServerWebSocket<unknown>
) {
  console.log(clientRoomConfig, { ws }, ws.pong());
}
