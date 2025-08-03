import type { CollectionConfig } from 'payload'

const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
   {
    name: "name",
    required: true,
    type: "text",
    label: "Store name",
    admin: {
    description: "This is the name of the store"
   }
   },
   {
    name:"slug",
    type: "text",
    index: true,
    required: true,
    unique: true,
    admin: {
    description: "This is the subdomain for the store"
   },
   },
   {
    name: "image",
    type: "upload",
    relationTo: "media",
   },
   {
    name: "stripeAccountId",
    type: "text",
    required: true,
    admin: {
        readOnly: true,
    }
   },
   {
    name: "stripeDetailSubmited",
    type: "checkbox",
    admin: {
        readOnly: true,
        description: "you cannot create products until your stripe details submitted"
    }
   }
  ],
}
export default Tenants

