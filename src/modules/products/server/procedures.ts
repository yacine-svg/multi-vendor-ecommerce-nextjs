import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { z } from "zod";

export const productsRouter= createTRPCRouter({
getMany: baseProcedure
.input(
  z.object({
    category: z.string().nullable().optional(),
    maxPrice: z.string().nullable().optional(),
    minPrice: z.string().nullable().optional(),
  }),
)
.query(async ({ctx, input}) => {
  const where: Where = {};
  if(input.maxPrice && input.minPrice){
      where.price={
        greater_than_equal : input.minPrice,
        less_than_equal : input.maxPrice,
      }
    } else if (input.minPrice){
        where.price={
        greater_than_equal : input.minPrice
        }
      } else if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal : input.maxPrice,
        }
      }

  if (input.category){
    const categoriesData = await ctx.db.find({
      collection: 'categories',
      limit: 1,
      depth: 1,  //populize subcategories
      pagination: false,
      where: {
        slug: {
          equals: input.category,
        }
      }
    });

     const formattedData = categoriesData.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
              // Because of 'depth: 1' in the query, subcategories are already populated
              ...(doc as Category),
              subcategories: undefined, // Remove subcategories to avoid deep nesting
            }))
          }));
          
    const subcategorieSlugs = [];
    const parentCategory = formattedData[0];

    if (parentCategory) {
      subcategorieSlugs.push(
        ...parentCategory.subcategories.map((subcategory) => subcategory.slug)
      )
      where["category.slug"] = {
        in: [parentCategory.slug, ...subcategorieSlugs]
      }
    }
    
  }
        const data = await ctx.db.find({
                collection: 'products',
                depth: 1,  //populize images and category
                where,
            });
return data;
}),
});