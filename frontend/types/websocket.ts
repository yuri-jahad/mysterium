export type Flags = "fr" | "en" | "es"

export type GameMessage = {
  type: "CREATE_ROOM" | "JOIN_ROOM" | "LEAVE_ROOM" | "GAME_ACTION";
  data: { [key: string]: string | boolean };
};

export interface BaseMessage {
  type: string;
}

export interface JoinRoom extends BaseMessage {
  type: "JOIN_ROOM";
  roomId: string;
  playerName: string;
}

interface CreateRoom extends BaseMessage {
  type: "CREATE_ROOM";
  roomName: string;
  hostname: string;
  flag: Flags;
  maxPlayers: number;
}

export interface GameAction extends BaseMessage {
  type: "GAME_ACTION";
  action: string;
  payload: Record<string, unknown>;
}

export type SocketEvents = CreateRoom | JoinRoom | GameAction;
