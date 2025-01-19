// import React from "react";
import { ProductStore } from "@/store/ProductStore";
import { columns } from "./column";
import { DataTable } from "../DataTable";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateProduct } from "@/components/Dialog/CreateProduct";
import { DeleteConfirmation } from "@/components/Dialog/DeleteConfirmation";
import { UpdateProduct } from "@/components/Dialog/UpdateProduct";
import { deleteProduct, getProducts } from "@/api/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IProduct } from "@/types/products";
import { DeleteDialogStore } from "@/store/DeleteDialogStore";
import { useToast } from "@/hooks/use-toast";

export default function DashboardProducts() {
  const [filterValue, setFilterValue] = useState("");
  const { toast } = useToast();

  const products = ProductStore((state) => state.products);
  const updateProducts = ProductStore((state) => state.updateProduct);

  const deleteDialogData = DeleteDialogStore((state) => state.dialogData);

  // Fetch Products
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });

  useEffect(() => {
    if (!data) return;
    updateProducts(data as IProduct[]);
  }, [data]);

  const { mutateAsync: deleteCurrentUser } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["products"] }); // refetch users on success
      toast({
        toastType: "success",
        title: "Delete Success !",
        description: "Product has been deleted successfully",
      });
    },
  });

  const confirmDelete = () => {
    const data = JSON.parse(deleteDialogData);
    const newProducts = products.filter((val) => val.id !== data.id);
    deleteCurrentUser({ id: data.id });
    updateProducts(newProducts);
  };

  const confirmUpdate = () => {
    toast({
      toastType: "success",
      title: "Update Success !",
      description: "Product has been updated successfully",
    });
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
