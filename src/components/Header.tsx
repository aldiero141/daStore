import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import daStoreLogo from "@/assets/images/daStoreLogo.png";

export default function Header() {
  return (
    <div className="flex align-center mx-auto px-4 md:px-6 lg:px-8 w-full shadow-sm">
      <header className="flex justify-center align-center h-20 w-full shrink-0 items-center px-4 md:px-6">
        <NavLink to="/" className="mr-6 flex">
          <img
            src={daStoreLogo}
            alt="Logo"
            width={120}
            height={50}
            className="mt-4"
          />
          <span className="sr-only">DaStore E-commerce</span>
        </NavLink>
        <div className="hidden lg:flex md:flex ml-auto  gap-2">
          <NavLink to="/" className="header-button">
            Home
          </NavLink>
          <NavLink to="/products" className="header-button">
            Products
          </NavLink>
          <NavLink to="#" className="header-button">
            Categories
          </NavLink>
          <NavLink to="#" className="header-button">
            About Us
          </NavLink>
          <NavLink to="#" className="header-button">
            Contact
          </NavLink>
          <Button variant="outline" className="justify-self-end">
            Sign in
          </Button>
          <Button className="justify-self-end">Sign Up</Button>
        </div>
      </header>
    </div>
  );
}
