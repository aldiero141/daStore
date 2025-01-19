// import React from "react";
import { ProductStore } from "@/store/ProductStore";
import { columns } from "./column";
import { DataTable } from "../DataTable";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateProduct } from "@/components/Dialog/CreateProduct";
import { DeleteConfirmation } from "@/components/Dialog/DeleteConfirmation";
import { UpdateProduct } from "@/components/Dialog/UpdateProduct";
import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/types/products";

export default function DashboardProducts() {
  const [filterValue, setFilterValue] = useState("");

  const products = ProductStore((state) => state.products);
  const updateProducts = ProductStore((state) => state.updateProduct);

  // Fetch Products
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });

  useEffect(() => {
    if (!data) return;
    updateProducts(data as IProduct[]);
  }, [data]);

  const confirmDelete = () => {
    console.log("deleted");
  };

  const confirmUpdate = () => {
    console.log("updated");
  };

  return (
    <div>
      <DeleteConfirmation confirm={confirmDelete} />
      <UpdateProduct confirm={confirmUpdate} />
      <h2 className="text-2xl font-semibold">Products List</h2>
      <p className="text-gray-500">List of all products sold in the system</p>

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
          isLoading={isLoading}
          columns={columns}
          data={products}
          filterColumn="name"
          filterValue={filterValue}
        />
      </div>
    </div>
  );
}
