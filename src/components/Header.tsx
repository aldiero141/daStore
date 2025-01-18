import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import daStoreLogo from "@/assets/images/daStoreLogo.png";

export default function Header() {
  return (
    <div className="flex align-center mx-auto px-4 md:px-6 lg:px-8 w-full shadow-sm">
      <header className="flex justify-center align-center h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link to="/" className="mr-6 flex">
          <img
            src={daStoreLogo}
            alt="Logo"
            width={120}
            height={50}
            className="mt-4"
          />
          <span className="sr-only">DaStore E-commerce</span>
        </Link>
        <div className="hidden lg:flex md:flex ml-auto  gap-2">
          <Link to="/" className="header-button">
            Home
          </Link>
          <Link to="/products" className="header-button">
            Products
          </Link>
          <Link to="#" className="header-button">
            Categories
          </Link>
          <Link to="#" className="header-button">
            About Us
          </Link>
          <Link to="#" className="header-button">
            Contact
          </Link>
          <Button variant="outline" className="justify-self-end">
            Sign in
          </Button>
          <Button className="justify-self-end">Sign Up</Button>
        </div>
      </header>
    </div>
  );
}
