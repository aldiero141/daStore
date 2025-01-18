import { CategoryStore } from "@/store/CategoryStore";
import { dummyCategories } from "@/lib/dummydata";
import { Card } from "@/components/ui/card";

export default function CategoryCards() {
  const categories = CategoryStore((state) => state.categories);
  const updateCategories = CategoryStore((state) => state.updateCategory);
  updateCategories(dummyCategories);

  const categoryItems = [];
  for (let i = 0; i < categories.length; i++) {
    categoryItems.push(
      <Card
        className="flex w-[200px] h-[80px] p-4 items-center justify-center  hover:shadow-lg hover:cursor-pointer capitalize  border-none"
        key={i}
      >
        <p className="text-lg  font-semibold">{categories[i]}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center mt-2 mb-16">
      {categoryItems}
    </div>
  );
}
