export interface JoinRoom {
  type: "JOIN_ROOM";
  roomId: string;
  playerName: string;
}

export interface CreateRoom {
  type: "CREATE_ROOM";
  roomName: string;
  gameName: string;
  isPrivate: boolean;
  hostname: string;
  createdAt: number;
}

export type RoomInfos = Omit<CreateRoom, "type">;

export type ROOM_EVENT = {
  type: "CREATE_ROOM" | "JOIN_ROOM" | "LEAVE_ROOM";
  data: { [key: string]: string | boolean };
};

export type SocketEvents = CreateRoom | JoinRoom;
