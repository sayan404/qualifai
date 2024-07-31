import React from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <div className="flex gap-4 items-center">
          {!isAuth ? (
            <>
              <Link href="/sign-in" className="text-white">
                Login
              </Link>
              <Link href="/sign-up" className="text-white">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-white">
                Profile
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
