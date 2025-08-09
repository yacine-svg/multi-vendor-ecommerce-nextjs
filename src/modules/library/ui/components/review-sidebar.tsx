import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
    productId: string;
}

export const ReviewSidebar = ({ productId}:Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.reviews.getOne.queryOptions({
        productId,
    }))

    return(
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}