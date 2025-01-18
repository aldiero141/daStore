import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  GitlabIcon as GitHub,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                DaStore
              </span>
            </a>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Shop Easy, Live Better – Your One-Stop Online Destination!
            </p>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © {new Date().getFullYear()} DaStore. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <GitHub className="w-5 h-5" />
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
