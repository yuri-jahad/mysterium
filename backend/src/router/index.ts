import type { RoutesCollection } from "@/shared/types/routes";
import protectedRoutes from "@/router/permissions/protected";
import publicRoutes from "@/router/permissions/public";

const routes: RoutesCollection = [...publicRoutes, ...protectedRoutes];

export default routes;
