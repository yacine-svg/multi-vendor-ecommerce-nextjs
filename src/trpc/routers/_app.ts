import { categoriesRouter } from '@/modules/categories/server/procedures';
import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  // Add other routers here as needed
});
// export type definition of API
export type AppRouter = typeof appRouter;