import type { GameName } from "@/core/types/games-manager";

export type CountryCode = "fr" | "en" | "es" | "de";
export type RoomContent = string;

export interface RoomConfiguration {
  gameName: GameName;
  hostName: string;
  //countryCode: CountryCode;
  accessToken: string;
  isPublic: boolean;
  createdAt: number;
}
