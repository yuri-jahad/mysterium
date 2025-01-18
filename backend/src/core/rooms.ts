import type { RoomsContent } from "@/core/types/rooms";
import type Room from "@/core/room";
import type { BroadCastRooms } from "@/server/events/types/broadcast-rooms";

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

  getRoomsInfo(): BroadCastRooms[] {
    console.log(this.#rooms, "xddd")
    return Array.from(this.#rooms.values()).map((room) => ({
      hostName: room.roomCreated.hostName,
      roomId: room.roomId,
      gameName: room.roomCreated.gameName,
      createAt: room.roomCreated.createdAt,
      countryCode: room.roomCreated.countryCode,
      isPublic: room.roomCreated.isPublic,
    }));
  }

  getAllRooms() {
    return Array.from(this.#rooms.values());
  }
}
