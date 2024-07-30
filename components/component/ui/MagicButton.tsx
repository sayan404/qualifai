"use client"
import React from "react";
import { useRouter } from "next/navigation";
export function MagicButton({
  title,
  position,
  icon,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  otherClasses?: string;
}) {
    const router = useRouter()
  const handleClick = (e: any) => {
    router.push("/sign-in")
    console.log("Button clicked");
  };
  return (
    <button
      className="relative  inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white  gap-2 backdrop-blur-3xl ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
}
