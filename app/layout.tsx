// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/component/Navbar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("antialiased max-h-screen overflow-hidden", fontHeading.variable, fontBody.variable)}
        >
          {" "}
          <ClerkLoading>
            <div className="flex flex-col items-center text-center mt-32">
              LOADING...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Navbar />
            {children}
          </ClerkLoaded>
        </body>
      </html>
      
    </ClerkProvider>
  );
}
