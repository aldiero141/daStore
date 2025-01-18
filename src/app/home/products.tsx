import LayoutDefault from "@/components/layouts/defaults";
import Products from "@/components/Products";

export default function products() {
  return (
    <LayoutDefault>
      <Products isPage={true} />
    </LayoutDefault>
  );
}
