import type { RoomConfiguration } from "@/shared/types/room";
import generateRoomKey from "@/shared/utils/generate-room-key";

export default class Room {
  #roomCreated;
  #roomId;
  constructor(roomCreate: RoomConfiguration) {
    this.#roomId = generateRoomKey();
    this.#roomCreated = { ...roomCreate };
    // this.players = new Map()
  }
}
