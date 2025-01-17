import type { RoutesCollection } from "@/router/types/routes";
import protectedRoutes from "@/router/permissions/protected";
import publicRoutes from "@/router/permissions/public";

const routes: RoutesCollection = [...publicRoutes, ...protectedRoutes];

export default routes;
