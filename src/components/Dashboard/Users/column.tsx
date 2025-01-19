"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eraser, PenLine, ArrowUpDown } from "lucide-react";
import { DeleteDialogStore } from "@/store/DeleteDialogStore";
import { UpdateDialogStore } from "@/store/UpdateDialogStore";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="Capitalize">{row.original.id}</div>,
  },
  {
    accessorKey: "name.firstname",
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="Capitalize">
        {row.original.name.firstname} {row.original.name.lastname}
      </div>
    ),
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="Capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    header: "Adress",
    id: "address",
    accessorFn: (row) =>
      `${row.address.city} No ${row.address.number}, ${row.address.city}, ${row.address.zipcode}`,
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      // Handle Dialog Delete
      const setOpenDialog = DeleteDialogStore((state) => state.setOpenDialog);
      const setDialogName = DeleteDialogStore((state) => state.setDialogName);
      const setDialogData = DeleteDialogStore((state) => state.setDialogData);

      const openDeleteDialog = () => {
        setOpenDialog(true);
        setDialogName("user");
        setDialogData(JSON.stringify(user));
      };

      //Handle Dialog Update
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
        setDialogDataUpdate(JSON.stringify(user));
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
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-700 cursor-pointer"
              onClick={() => openDeleteDialog()}
            >
              <Eraser />
              Delete User
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-blue-700 cursor-pointer"
              onClick={() => openUpdateDialog()}
            >
              <PenLine />
              Update User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
