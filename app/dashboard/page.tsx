// pages/index.tsx
"use client";
import { Dashboard } from "@/components/component/Dashboard";
import { useEffect } from "react";
import { Session, User } from "@clerk/nextjs/server";
import { useSession } from "@clerk/nextjs";
export default function Home() {
  const data = useSession();

  useEffect(() => {
    console.log("data", data);
  }, []);
  return (
    <div>
      <Dashboard />
    </div>
  );
}
