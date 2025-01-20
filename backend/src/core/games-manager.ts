import type {
  BroadCastRooms,
  BroadCastRoomsContent,
} from "@/server/events/types/broadcast-rooms";
import type { RoomConfiguration } from "@/core/types/room";
import type { GameName } from "@/core/types/games-manager";
import Rooms from "@/core/rooms";
import Room from "@/core/room";

export default class GamesManager {
  private games: Map<GameName, Rooms>;
  private readonly gamesNames = new Set<GameName>(["Bombparty", "Popsauce"]);
  private static instance: GamesManager | null = null;

  private constructor() {
    this.games = new Map();
    this.initializeGames();
  }

  public static getInstance(): GamesManager {
    if (!GamesManager.instance) {
      GamesManager.instance = new GamesManager();
    }
    return GamesManager.instance;
  }

  public resetGame(game: GameName) {
    this.games.set(game, new Rooms());
  }

  getRoomInfos(): BroadCastRoomsContent {
    let roomsInfos = new Set<BroadCastRooms[]>();
    for (let [gameName, rooms] of this.games) {
      roomsInfos.add(rooms.getRoomsInfo());
    }
    return roomsInfos;
  }
  public resetGames() {
    this.initializeGames();
  }

  private initializeGames() {
    for (const gameName of this.gamesNames) {
      this.games.set(gameName, new Rooms());
    }
  }

  addRoom(roomConfiguration: RoomConfiguration) {
    const targetRooms = this.games.get(roomConfiguration.gameName);
    if (!targetRooms) return;

    targetRooms.addRoom(new Room(roomConfiguration));
  }
}
