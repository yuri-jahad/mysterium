import type { RoomCreate } from "@/types/room";

export default class Room {
  #roomCreated;
  constructor(roomCreate: RoomCreate) {
    this.#roomCreated = { ...roomCreate };
    this.players = new Map()
  }


}
