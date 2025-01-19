// import { useState } from "react";
import AdminLayout from "@/components/layouts/admin";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/AdminHeader";
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <AdminLayout>
      <AdminSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </AdminLayout>
  );
}

export default Dashboard;
