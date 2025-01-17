import type { RoomsContent } from "@/core/types/rooms";
import type Room from "@/core/room";

export default class Rooms {
  #rooms: RoomsContent;

  constructor() {
    this.#rooms = new Map();
  }

  addRoom(room: Room) {
    this.#rooms.set(room.roomId, room);
  }

  removeRoom(roomId: string) {
    this.#rooms.delete(roomId);
  }

  getRoom(roomId: string) {
    return this.#rooms.get(roomId);
  }

  hasRoom(roomId: string) {
    return this.#rooms.has(roomId);
  }

  getAllRooms() {
    return Array.from(this.#rooms.values());
  }
}
