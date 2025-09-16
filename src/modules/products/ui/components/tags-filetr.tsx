import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon, Plus, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagsFilterProps {
    value?: string[] | null;
    onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: TagsFilterProps) => {
    const trpc = useTRPC();
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions({
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
        }
    }));

    const onClick = (tag: string) => {
        if (value?.includes(tag)) {
            onChange(value?.filter((t) => t !== tag) || []);
        } else {
            onChange([...(value || []), tag]);
        }
    };

    return (
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
            {isLoading ? (
                <div className="flex items-center justify-center p-4">
                    <LoaderIcon className="w-5 h-5 animate-spin text-gray-400" />
                </div>
            ) : (
                data?.pages.map((page) =>
                    page.docs.map((tag) => {
                        const isSelected = value?.includes(tag.name);
                        
                        return (
                            <div
                                key={tag.id}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200",
                                    isSelected
                                        ? "bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200"
                                        : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                                )}
                                onClick={() => onClick(tag.name)}
                            >
                                <div className="flex items-center gap-3">
                                    <Tag className={cn(
                                        "w-4 h-4",
                                        isSelected ? "text-pink-600" : "text-gray-500"
                                    )} />
                                    <span className={cn(
                                        "font-medium",
                                        isSelected ? "text-pink-900" : "text-gray-700"
                                    )}>
                                        {tag.name}
                                    </span>
                                </div>
                                <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() => onClick(tag.name)}
                                    className={cn(
                                        "data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600",
                                        isSelected && "ring-2 ring-pink-200"
                                    )}
                                />
                            </div>
                        );
                    })
                )
            )}
            {hasNextPage && (
                <button
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="flex items-center gap-2 p-3 text-sm font-medium text-pink-600 hover:text-pink-700 disabled:opacity-50 cursor-pointer transition-colors duration-200 rounded-lg hover:bg-pink-50"
                >
                    <Plus className="w-4 h-4" />
                    {isFetchingNextPage ? "Loading..." : "Load more tags"}
                </button>
            )}
        </div>
    );
};