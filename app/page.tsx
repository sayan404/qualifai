/* eslint-disable react/no-unescaped-entities */
import Hero from "@/components/component/Hero";

export default function Home() {
  return (
    <main
      className="relative bg-black-100 flex justify-center items-center flex-col  max-h-full overflow-hidden
    mx-auto sm:px-10 px-5"
    >
      <div className="max-w-7xl w-full">
        <Hero />
      </div>
    </main>
  );
}
