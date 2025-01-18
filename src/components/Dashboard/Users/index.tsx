// import React from "react";

import { ChangeEvent, useState } from "react";
import { DataTable } from "../DataTable";
import { columns } from "./column";
import { dummyUsers } from "@/lib/dummydata";
import { UserStore } from "@/store/UserStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function DashboardUsers() {
  const [filterValue, setFilterValue] = useState("");

  const users = UserStore((state) => state.users);
  const updateUsers = UserStore((state) => state.updateUsers);
  updateUsers(dummyUsers);

  return (
    <div>
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
          <Button variant="outline" className="ml-auto">
            <Pencil /> Add New Users
          </Button>
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
