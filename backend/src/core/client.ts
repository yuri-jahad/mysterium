import type { RoomConfiguration } from "@/core/types/room";
import type { ServerWebSocket } from "bun";

export class Clients {
  private clients: Map<string, ServerWebSocket<unknown>>;

  constructor(roomConfiguration: RoomConfiguration) {
    this.clients = new Map();
  }

  addClient(ws: ServerWebSocket<unknown>) {
    const clientIP = ws.remoteAddress;
    this.clients.set(clientIP, ws);
    return clientIP;
  }

  removeClient(clientIP: string) {
    this.clients.delete(clientIP);
  }

  getClient(clientIP: string) {
    return this.clients.get(clientIP);
  }
}
