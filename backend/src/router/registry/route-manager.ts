import type { HttpMethod, RouteHandler } from "@/router/types/routes";
import RouteCollection from "@/router/registry/route-collection";

// router.ts
export default class RoutesManager {
  private routes: Record<HttpMethod, RouteCollection>;

  constructor() {
    this.routes = {
      get: new RouteCollection(),
      post: new RouteCollection(),
    };
  }

  public register(
    routes: Array<{
      method: HttpMethod;
      handler: RouteHandler;
      key: string;
    }>
  ) {
    routes.forEach(({ method, handler, key }) => {
      this.routes[method].add(key, handler);
    });
    return this;
  }

  public get(method: HttpMethod, key: string) {
    return this.routes[method].get(key);
  }
}
