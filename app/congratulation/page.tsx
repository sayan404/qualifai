"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const InterviewEndPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 4000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
        <FaSpinner className="animate-spin text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Generating Report Card</h1>
        <p className="text-lg">
          Your interview is being analyzed. It will be available in your
          dashboard soon...
        </p>
      </div>
    </div>
  );
};

export default InterviewEndPage;
