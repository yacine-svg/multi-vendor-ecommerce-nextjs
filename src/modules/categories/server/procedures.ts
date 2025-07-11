import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from '@/payload-types';

export const categoriesRouter= createTRPCRouter({
getMany: baseProcedure.query(async ({ctx}) => {


        const data = await ctx.db.find({
                collection: 'categories',
                depth: 1,  //populize subcategories
                pagination: false, //load all of them
                where: {
                parent: {
                    exists: false,
                },
                },
                sort: 'name', // Sort by name
            });

      const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          // Because of 'depth: 1' in the query, subcategories are already populated
          ...(doc as Category),
          subcategories: undefined, // Remove subcategories to avoid deep nesting
        }))
      }));

return formattedData;
}),
});