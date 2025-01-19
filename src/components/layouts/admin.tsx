import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SidebarProvider>{children}</SidebarProvider>
    </main>
  );
}
