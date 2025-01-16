import type { RoomsKeys, RoomsContent } from "@/shared/types/rooms";

export default class Rooms {
  #rooms: RoomsContent;
  constructor() {
    this.#rooms = new Map();
  }
}
