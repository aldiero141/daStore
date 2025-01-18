import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ProductStore } from "@/store/ProductStore";
import { CategoryStore } from "@/store/CategoryStore";
import { dummyCategories, dummyProducts } from "@/lib/dummydata";
import CategoryCards from "./CategoryCards";
import { SearchAndFilter } from "./SearchAndFilter";
import { capitalizeFirstLetter } from "@/lib/utils";

const createProductCards = () => {
  const products = ProductStore((state) => state.products);
  const updateProducts = ProductStore((state) => state.updateProduct);
  updateProducts(dummyProducts);
  const productCard = [];
  for (let i = 0; i < products.length; i++) {
    productCard.push(
      <Card
        className="flex flex-col w-[280px] min-h-[320px] items-center p-4 justify-between hover:shadow-lg hover:cursor-pointer capitalize "
        key={i}
      >
        <div className="flex flex-col items-center">
          <img src={products[i].image} alt="product" width={130} />
        </div>
        <div className="flex flex-row w-full items-left justify-between">
          <div className="flex flex-col">
            <h4 className="text-2xl font-semibold">{products[i].title}</h4>
            <p className="text-sm font-medium text-gray-500">
              {products[i].category}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xl">${products[i].price}</p>
            <p className="flex flex-row items-center gap-2 text-gray-500 text-sm font-medium">
              {products[i].rating.rate}

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
    );
  }
  return productCard;
};

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

export default function Products({ isPage }: { isPage: boolean }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Filter Categories
  const categoryFilterOptions = createCategoryFilter();

  // Search and Filter
  const handleSearch = (search: string, filter: string) => {
    setSearch(search);
    setFilter(filter);
  };

  return (
    <div className="max-w-[70vw] my-8">
      {!isPage && <CategoryCards />}
      {isPage && (
        <SearchAndFilter
          onSearch={handleSearch}
          filterOptions={categoryFilterOptions}
        />
      )}
      <div>search: {search}</div>
      <div>filter: {filter}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {createProductCards()}
      </div>
    </div>
  );
}
