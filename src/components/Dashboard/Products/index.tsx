// import React from "react";
import { dummyProducts } from "@/lib/dummydata";
import { ProductStore } from "@/store/ProductStore";
import { columns } from "./column";
import { DataTable } from "../DataTable";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function DashboardProducts() {
  const [filterValue, setFilterValue] = useState("");

  const products = ProductStore((state) => state.products);
  const updateProducts = ProductStore((state) => state.updateProduct);
  updateProducts(dummyProducts);

  return (
    <div>
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
          <Button variant="outline" className="ml-auto">
            <Pencil /> Add New Product
          </Button>
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
