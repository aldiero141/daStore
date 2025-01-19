// import React from "react";
import { dummyCategories } from "@/lib/dummydata";
import { CategoryStore } from "@/store/CategoryStore";
import { columns } from "./column";
import { DataTable } from "../DataTable";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { CreateCategory } from "@/components/Dialog/CreateCategory";
import { DeleteConfirmation } from "@/components/Dialog/DeleteConfirmation";
import { UpdateCategory } from "@/components/Dialog/UpdateCategory";
import { DeleteDialogStore } from "@/store/DeleteDialogStore";

export default function DashboardCategories() {
  const [filterValue, setFilterValue] = useState("");

  const deleteDialogData = DeleteDialogStore((state) => state.dialogData);

  const categories = CategoryStore((state) => state.categories);
  const updateCategories = CategoryStore((state) => state.updateCategory);
  if (categories.length === 0) updateCategories(dummyCategories);

  const confirmDelete = () => {
    const data = JSON.parse(deleteDialogData);
    const newCategory = categories.filter((val) => val !== data.original);
    updateCategories(newCategory);
  };
  const confirmUpdate = () => {
    console.log("updated");
  };
  return (
    <div>
      <DeleteConfirmation confirm={confirmDelete} />
      <UpdateCategory confirm={confirmUpdate} />
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
