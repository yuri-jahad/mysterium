import { protect } from "@/auth/guards/oauth-guard";

import type {
  HttpMethod,
  RouteHandler,
  RoutesCollection,
} from "@/shared/types/routes";

const protectedRoutes: RoutesCollection = [];

export default protectedRoutes;
