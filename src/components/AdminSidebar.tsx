import { Users, ShoppingCart, ChartBarStacked } from "lucide-react";
import daStoreLogo from "@/assets/images/daStoreLogo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  // { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: ShoppingCart, label: "Products", href: "/dashboard/products" },
  { icon: ChartBarStacked, label: "Categories", href: "/dashboard/categories" },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center  gap-2" size="lg">
              <a href="/dashboard/users">
                <img
                  src={daStoreLogo}
                  alt="Logo"
                  width={120}
                  height={50}
                  className="mt-4"
                />
                <span className="sr-only">DaStore E-commerce</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()} DaStore. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
