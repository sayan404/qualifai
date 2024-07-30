// pages/index.tsx
"use client";
import { Dashboard } from "@/components/component/Dashboard";
import { Chooser } from "@/components/component/Chooser";
import { Compiler } from "@/components/component/Compiler";

export default function Home() {
  return (
    <div>
      <Compiler />
    </div>
  );
}
