import type { RoomConfiguration } from "@/shared/types/room";

export default class Room {
  #roomCreated;
  constructor(roomCreate: RoomConfiguration) {
    this.#roomCreated = { ...roomCreate };
    // this.players = new Map()
  }
}
