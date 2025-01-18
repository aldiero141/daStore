import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col w-full h-screen items-center">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
