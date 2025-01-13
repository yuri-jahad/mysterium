import { protect } from "@/router/guards/auth-guard";

import type {
  HttpMethod,
  RouteHandler,
  RoutesCollection,
} from "@/shared/types/routes";
import test from "@/router/handlers/test";

const protectedRoutes: RoutesCollection = [
  {
    method: "get",
    handler: protect(test),
    key: "test",
  },
];

export default protectedRoutes;
