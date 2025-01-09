import type { RoutesCollection } from "@/types/routes";
import protectedRoutes from "@/routes/permissions/protected";
import publicRoutes from "@/routes/permissions/public";

const routes: RoutesCollection = [
  ...publicRoutes, 
  ...protectedRoutes, 
];

export default routes;
