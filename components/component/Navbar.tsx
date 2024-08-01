import React from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";

const Navbar = async () => {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <header className="p-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold font-serif">Qualifai</h1>
      <nav className="flex flex-row justify-center items-center gap-4">
        <Link href="/">
          {" "}
          <Button
            variant="ghost"
            className="mr-4 text-white hover:text-gray-300"
          >
            Home
          </Button>{" "}
        </Link>
        {!isAuth ? (
          <>
            {" "}
            <Link href="/sign-up">
              {" "}
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/sign-in" className="text-white">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Sign In
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-white">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Profile
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
