import type { GameName } from "@/core/types/games-manager";
import type { CountryCode } from "@/core/types/room";

export interface BroadCastRooms {
  hostName: string;
  roomId: string;
  gameName: GameName;
  createAt: number;
  countryCode: CountryCode;
  isPublic: boolean;
}

export type BroadCastRoomsContent = Set<BroadCastRooms[]> 