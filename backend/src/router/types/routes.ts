export type HttpMethod = "post" | "get";
export type RouteHandler = (req: Request) => any;
export type RoutesCollection = Array<{
  method: HttpMethod;
  handler: RouteHandler;
  key: string;
}>;
