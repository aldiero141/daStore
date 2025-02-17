import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full h-screen items-center">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
