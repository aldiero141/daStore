import { CategoryStore } from "@/store/CategoryStore";
import { dummyCategories } from "@/lib/dummydata";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router";

export default function CategoryCards() {
  const categories = CategoryStore((state) => state.categories);
  const updateCategories = CategoryStore((state) => state.updateCategory);
  updateCategories(dummyCategories);

  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const onNavigate = (category: string) => {
    setSearchParams({ f: category });
    navigate(`/products?f=${category}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center mt-2 mb-16">
      {categories.length > 0 &&
        categories.map((category, i) => (
          <Card
            className="flex w-[200px] h-[80px] p-4 items-center justify-center  hover:shadow-lg hover:cursor-pointer capitalize  border-none"
            key={i}
            onClick={() => onNavigate(category)}
          >
            <p className="text-lg  font-semibold">{category}</p>
          </Card>
        ))}
    </div>
  );
}
