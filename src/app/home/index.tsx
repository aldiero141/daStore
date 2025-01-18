// import { useState } from "react";
import Banner from "@/components/Banner";
import Products from "@/components/Products";
import LayoutDefault from "@/components/layouts/defaults";

function Home() {
  return (
    <LayoutDefault>
      <div className="flex flex-col align-center justify-center gap-4 w-[70vw]">
        <Banner />
        <Products isPage={false} />
      </div>
    </LayoutDefault>
  );
}

export default Home;
