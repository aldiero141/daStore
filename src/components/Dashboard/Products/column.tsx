"use client";

import { formatCurrency } from "@/lib/utils";
import { IProduct } from "@/types/products";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eraser, PenLine } from "lucide-react";
import { DeleteDialogStore } from "@/store/DeleteDialogStore";
import { UpdateDialogStore } from "@/store/UpdateDialogStore";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IProduct>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    id: "name",
    accessorKey: "title",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = formatCurrency(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    header: "Rating",
    accessorKey: "rating.rate",
    accessorFn: (row) => `${row?.rating?.rate}/5`,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center justify-center gap-1">
          {product?.rating?.rate}/5
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
        </div>
      );
    },
  },
  {
    header: "Total Ratings",
    accessorKey: "rating.count",
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      // Handle Dialog Delete
      const setOpenDialog = DeleteDialogStore((state) => state.setOpenDialog);
      const setDialogName = DeleteDialogStore((state) => state.setDialogName);
      const setDialogData = DeleteDialogStore((state) => state.setDialogData);

      const openDeleteDialog = () => {
        setOpenDialog(true);
        setDialogName("product");
        setDialogData(JSON.stringify(product));
      };

      // Handle Dialog Update
      const setOpenUpdateDialog = UpdateDialogStore(
        (state) => state.setOpenDialog
      );
      const setDialogNameUpdate = UpdateDialogStore(
        (state) => state.setDialogName
      );
      const setDialogDataUpdate = UpdateDialogStore(
        (state) => state.setDialogData
      );

      const openUpdateDialog = () => {
        setOpenUpdateDialog(true);
        setDialogNameUpdate("user");
        setDialogDataUpdate(JSON.stringify(product));
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Copy Product ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-700 cursor-pointer"
              onClick={() => openDeleteDialog()}
            >
              <Eraser />
              Delete Product
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-blue-700 cursor-pointer"
              onClick={() => openUpdateDialog()}
            >
              <PenLine />
              Update Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
