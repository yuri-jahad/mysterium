export type flag = "fr";

export type RoomContent = Map<string, WebSocket>


export interface RoomCreate {
  flag: flag;
  code: string;
  token: string;
  isPrivate: boolean;
  createAt: number;
}
