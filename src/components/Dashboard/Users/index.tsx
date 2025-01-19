// import React from "react";

import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { columns } from "./column";
import { UserStore } from "@/store/UserStore";
import { Input } from "@/components/ui/input";
import { CreateUser } from "@/components/Dialog/CreateUser";
import { DeleteConfirmation } from "@/components/Dialog/DeleteConfirmation";
import { UpdateUser } from "@/components/Dialog/UpdateUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getUsers } from "@/api/users";
import { IUser } from "@/types/users";
import { DeleteDialogStore } from "@/store/DeleteDialogStore";
import { useToast } from "@/hooks/use-toast";

export default function DashboardUsers() {
  const [filterValue, setFilterValue] = useState("");
  const { toast } = useToast();

  const users = UserStore((state) => state.users);
  const updateUsers = UserStore((state) => state.updateUsers);

  const deleteDialogData = DeleteDialogStore((state) => state.dialogData);

  // Fetch Users
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUsers(),
  });

  useEffect(() => {
    if (!data) return;
    updateUsers(data as IUser[]);
  }, [data]);

  const { mutateAsync: deleteCurrentUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users on success
      toast({
        toastType: "success",
        title: "Delete Success !",
        description: "User has been deleted successfully",
      });
    },
  });

  const confirmDelete = () => {
    const data = JSON.parse(deleteDialogData);
    const newUsers = users.filter((val) => val.id !== data.id);
    deleteCurrentUser({ id: data.id });
    updateUsers(newUsers);
  };

  const confirmUpdate = () => {
    toast({
      toastType: "success",
      title: "Update Success !",
      description: "User has been updated successfully",
    });
  };
  return (
    <div>
      <DeleteConfirmation confirm={confirmDelete} />
      <UpdateUser confirm={confirmUpdate} />
      <h2 className="text-2xl font-semibold">Users List</h2>
      <p className="text-gray-500">List of all users in the system</p>

      <div className="container mx-auto py-10">
        <div className="flex items-center py-4 gap-2">
          <Input
            placeholder={`Filter email...`}
            value={filterValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFilterValue(event?.target?.value)
            }
            className="w-full"
          />
          <CreateUser />
        </div>
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={users}
          filterColumn="email"
          filterValue={filterValue}
        />
      </div>
    </div>
  );
}
