// pages/404.tsx
import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
      <Image src="/404.svg" alt="404 Error" width={400} height={400} className="mb-8" />
      <h1 className="text-5xl md:text-7xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl mb-8">Oops! The page you are looking for does not exist.</p>
      <Link href="/">
        <a className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-full transition-colors duration-300">
          <FaHome className="mr-2" />
          Go back home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
