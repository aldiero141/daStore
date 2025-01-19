"use client";

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

export const columns: ColumnDef<string>[] = [
  {
    id: "index",
    header: "Index",
    cell: ({ row }) => `${row.index + 1} `,
  },
  {
    header: "Name",
    id: "name",
    cell: ({ getValue }) => getValue(),
    accessorFn: (row) => row,
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row;

      // Handle Dialog Delete
      const setOpenDialog = DeleteDialogStore((state) => state.setOpenDialog);
      const setDialogName = DeleteDialogStore((state) => state.setDialogName);
      const setDialogData = DeleteDialogStore((state) => state.setDialogData);

      const openDeleteDialog = () => {
        setOpenDialog(true);
        setDialogName("category");
        setDialogData(JSON.stringify(category));
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
        setDialogNameUpdate("category");
        setDialogDataUpdate(JSON.stringify(category));
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
                navigator.clipboard.writeText((category.index + 1).toString())
              }
            >
              Copy Category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-700 cursor-pointer"
              onClick={() => openDeleteDialog()}
            >
              <Eraser />
              Delete Category
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-blue-700 cursor-pointer"
              onClick={() => openUpdateDialog()}
            >
              <PenLine />
              Update Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
