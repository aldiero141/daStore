import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-xl font-semibold">DaStore Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
