// import React from "react";
import { dummyProducts } from "@/lib/dummydata";
import { ProductStore } from "@/store/ProductStore";
import { columns } from "./column";
import { DataTable } from "../DataTable";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { CreateProduct } from "@/components/Dialog/CreateProduct";
import { DeleteConfirmation } from "@/components/Dialog/DeleteConfirmation";

export default function DashboardProducts() {
  const [filterValue, setFilterValue] = useState("");

  const products = ProductStore((state) => state.products);
  if (products.length === 0) {
    const updateProducts = ProductStore((state) => state.updateProduct);
    updateProducts(dummyProducts);
  }

  const confirmDelete = () => {
    console.log("delete");
  };

  return (
    <div>
      <DeleteConfirmation confirm={confirmDelete} />
      <h2 className="text-2xl font-semibold">Products List</h2>
      <p className="text-gray-500">list of all products sold in the system</p>

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
          <CreateProduct />
        </div>
        <DataTable
          columns={columns}
          data={products}
          filterColumn="name"
          filterValue={filterValue}
        />
      </div>
    </div>
  );
}
