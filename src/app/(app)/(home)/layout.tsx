import { Category } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import Footer from './footer';
import { Navbar } from './navbar';
import { SearchFilters } from './search-filters';

interface Props {
  children: React.ReactNode;
};
const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
        config: configPromise,
      });
  
      const data = await payload.find({
        collection: 'categories',
        depth: 1,  //populize subcategories
        pagination: false, //load all of them
        where: {
          parent: {
            exists: false,
          }
        }
      });
const formattedData = data.docs.map((doc) => ({
  ...doc,
  subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
    // Because of 'depth: 1' in the query, subcategories are already populated
    ...(doc as Category),
    subcategories: undefined, // Remove subcategories to avoid deep nesting
  }))
}));

      return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <SearchFilters data={formattedData}/>
        <div className="flex-1 bg-[#f4f4f0]">
        {children}
        </div>
        <Footer />
    </div>
  );
}
export default Layout;