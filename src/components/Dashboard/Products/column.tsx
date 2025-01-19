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
    header: "User ID",
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
    accessorFn: (row) => `${row.rating.rate}/5`,
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Copy Product ID
            </DropdownMenuItem>
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
