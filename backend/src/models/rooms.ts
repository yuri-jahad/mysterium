import type { RoomsKeys, RoomsContent } from "@/types/rooms";

export default class Rooms {
  #rooms: RoomsContent;
  #roomsKeys: RoomsKeys;
  constructor() {
    this.#rooms = new Map();
    this.#roomsKeys = new Set();
  }
}
