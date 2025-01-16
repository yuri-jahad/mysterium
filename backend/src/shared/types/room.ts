export type CountryCode = "fr" | "en" | "es" | "de"; 
export type PlayerConnections = Map<string, WebSocket>;

export interface RoomConfiguration {
  hostName: string;
  countryCode: CountryCode;
  accessToken: string;
  isPrivate: boolean;
  createdAt: number;
}