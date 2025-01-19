// import React from "react";

import { ChangeEvent, useState } from "react";
import { DataTable } from "../DataTable";
import { columns } from "./column";
import { dummyUsers } from "@/lib/dummydata";
import { UserStore } from "@/store/UserStore";
import { Input } from "@/components/ui/input";
import { CreateUser } from "@/components/Dialog/CreateUser";
import { DeleteConfirmation } from "@/components/Dialog/DeleteConfirmation";
import { UpdateUser } from "@/components/Dialog/UpdateUser";

export default function DashboardUsers() {
  const [filterValue, setFilterValue] = useState("");

  const users = UserStore((state) => state.users);
  if (users.length === 0) {
    const updateUsers = UserStore((state) => state.updateUsers);
    updateUsers(dummyUsers);
  }

  const confirmDelete = () => {
    console.log("delete");
  };

  const confirmUpdate = () => {
    console.log("updated");
  };
  return (
    <div>
      <DeleteConfirmation confirm={confirmDelete} />
      <UpdateUser confirm={confirmUpdate} />
      <h2 className="text-2xl font-semibold">Users List</h2>
      <p className="text-gray-500">list of all users in the system</p>

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
          columns={columns}
          data={users}
          filterColumn="email"
          filterValue={filterValue}
        />
      </div>
    </div>
  );
}
