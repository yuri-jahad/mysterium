import { gamesManager } from "@/core/games-manager-instance";

export default function broadcastRooms() {
  const data = gamesManager.getRoomInfos();
  console.log({data})
  return data
}
