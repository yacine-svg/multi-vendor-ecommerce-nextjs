interface Props {
    params: Promise<{category: string;
        subcategory: string;
     }>;
}
const page = async({params}:Props) => {
    const { category } = await params;
    const { subcategory } = await params;


    return (
        <div>
            Category: {category} <br />
            subCategory: {subcategory}
        </div>
    );

}
export default page;