import { protect } from "@/auth/middlewares/auth";

import type {
  HttpMethod,
  RouteHandler,
  RoutesCollection,
} from "@/types/routes";
import test from "@/routes/handlers/test";

const protectedRoutes: RoutesCollection = [
  {
    method: "get",
    handler: protect(test),
    key: "test",
  },
];

export default protectedRoutes;
