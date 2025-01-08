export type HttpMethod = "post" | "get";
export type RouteHandler = (req: Request) => Response | Promise<Response>;