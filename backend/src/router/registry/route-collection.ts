import type { RouteHandler } from "@/router/types/routes";

export default class RouteCollection {
  private handlers: Record<string, RouteHandler> = {};

  add(key: string, handler: RouteHandler): void {
    if (this.handlers[key]) {
      console.warn(`Route ${key} already exists`);
    }
    this.handlers[key] = handler;
  }

  remove(key: string): void {
    delete this.handlers[key];
  }

  has(key: string): boolean {
    return key in this.handlers;
  }

  get(key: string): RouteHandler | undefined {
    return this.handlers[key];
  }

  getAll(): Record<string, RouteHandler> {
    return { ...this.handlers };
  }
}
