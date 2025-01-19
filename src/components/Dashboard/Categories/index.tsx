// import React from "react";
import { dummyCategories } from "@/lib/dummydata";
import { CategoryStore } from "@/store/CategoryStore";
import { columns } from "./column";
import { DataTable } from "../DataTable";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { CreateCategory } from "@/components/Dialog/CreateCategory";

export default function DashboardCategories() {
  const [filterValue, setFilterValue] = useState("");

  const categories = CategoryStore((state) => state.categories);
  if (categories.length === 0) {
    const updateCategories = CategoryStore((state) => state.updateCategory);
    updateCategories(dummyCategories);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Categories List</h2>
      <p className="text-gray-500">
        list of all category for all products in the system
      </p>

      <div className="container mx-auto py-10">
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder={`Filter name...`}
            value={filterValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFilterValue(event?.target?.value)
            }
            className="w-full"
          />
          <CreateCategory />
        </div>
        <DataTable
          columns={columns}
          data={categories}
          filterColumn="name"
          filterValue={filterValue}
        />
      </div>
    </div>
  );
}
