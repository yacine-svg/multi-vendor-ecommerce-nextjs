import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CategoriesGetManyOutput = inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type CategoriesGetManyInputSingle = CategoriesGetManyOutput[0];