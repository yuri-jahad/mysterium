import type { GameName } from "@/core/types/games-manager";

export interface BroadCastRooms {
  hostname: string;
  roomId: string;
  gameName: GameName;
  createAt: number;
  isPrivate: boolean;
}

export type BroadCastRoomsContent = Set<BroadCastRooms[]>;
