import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CategoryStore } from "@/store/CategoryStore";
import { dummyCategories } from "@/lib/dummydata";
import CategoryCards from "./CategoryCards";
import { SearchAndFilter } from "./SearchAndFilter";
import { capitalizeFirstLetter, truncateText } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ProductStore } from "@/store/ProductStore";
import { IProduct } from "@/types/products";
import { Skeleton } from "./ui/skeleton";

export default function Products({ isPage }: { isPage: boolean }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Filter Categories
  const categoryFilterOptions = createCategoryFilter();
  const limit = !isPage ? 6 : null;

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setFilter(searchParams.get("f") || "");
  }, [searchParams]);

  // Search and Filtern
  const handleSearch = (search: string, filter: string) => {
    setSearch(search);
    setFilter(filter);
    setSearchParams({ q: search, f: filter });
  };

  // Fetch Products
  const { data, isLoading } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => await getProducts({ filter, limit }),
  });

  const products = ProductStore((state) => state.products);
  const updateProducts = ProductStore((state) => state.updateProduct);

  useEffect(() => {
    if (!data) return;

    const filteredData = data.filter((product) => {
      if (search.toLowerCase() == "") return products;
      return product.title.toLowerCase().includes(search.toLowerCase());
    });

    updateProducts(filteredData as IProduct[]);
  }, [data, search]);

  return (
    <div className="max-w-[70vw] my-8">
      {!isPage && <CategoryCards />}
      {isPage && (
        <>
          <SearchAndFilter
            onSearch={handleSearch}
            filterOptions={categoryFilterOptions}
          />
          <div className="flex justify-between items-center mb-8">
            <h2 className="capitalize text-2xl font-semibold">
              {!filter ? "All Product" : `${filter} Catalogue`}
            </h2>
          </div>
        </>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              className="flex flex-col w-[280px] min-h-[360px] items-center p-4 justify-between hover:shadow-lg hover:cursor-pointer capitalize "
              key={index}
            >
              <Skeleton className="h-[200px] w-[200px] " />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </Card>
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {products &&
            products?.map((product, i) => (
              <Card
                className="flex flex-col w-[280px] min-h-[360px] items-center p-4 justify-between hover:shadow-lg hover:cursor-pointer capitalize "
                key={i}
              >
                <div className="flex flex-col items-center justify-center w-[200px] h-[200px] mb-10">
                  <img src={product.image} alt="product" width={120} />
                </div>
                <div className="flex flex-row w-full items-left justify-between ">
                  <div className="flex flex-col">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h4 className="text-2xl font-semibold">
                            {truncateText(product.title, 20)}
                          </h4>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 rounded-md bg-black text-primary-foreground shadow text-sm">
                          <p>{product.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-sm font-medium text-gray-500">
                      {product.category}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-end">
                    <p className="text-xl">${product.price}</p>
                    <p className="flex flex-row items-center gap-2 text-gray-500 text-sm font-medium">
                      {product.rating.rate}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

const createCategoryFilter = () => {
  const categories = CategoryStore((state) => state.categories);
  const updateCategories = CategoryStore((state) => state.updateCategory);
  updateCategories(dummyCategories);

  const categoryFilter = [
    {
      value: "all",
      label: "All",
    },
  ];
  for (let i = 0; i < categories.length; i++) {
    categoryFilter.push({
      value: categories[i],
      label: capitalizeFirstLetter(categories[i]),
    });
  }
  return categoryFilter;
};
