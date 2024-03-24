"use client";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              className="w-auto h-6 sm:h-7"
              src="https://raw.githubusercontent.com/MoniqueChetty/Netflix-clone/main/netflix-clone/public/car%20logo.jpg"
              alt="Logo"
              height={50}
              width={129}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
