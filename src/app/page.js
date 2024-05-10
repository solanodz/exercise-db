import { buttonVariants } from "@/components/ui/button";
import { montserrat } from "@/ui/fonts";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-2/3 md:flex-row flex-col items-center gap-3 bg-blue-600">
      <section className="w-full h-screen justify-center md:w-1/2 sm:p-0 p-4 flex flex-col items-center mx-auto text-center md:text-left max-w-xl">
        <h1 className={`${montserrat.className} antialiased font-black text-5xl sm:text-7xl tracking-tight text-left text-white drop-shadow-md`}>WELCOME TO DETRAINING</h1>
        <p className="tracking-tight text-blue-300 font-medium text-left sm:text-md text-sm w-full">Exercises database with video explanation and description.</p>
        <div className="flex gap-2 md:flex-row flex-col my-4 mr-auto">
          <Link href="/private" className={buttonVariants({ variant: 'default' })}>Admin panel</Link>
          <Link href="/exercises" className={`${buttonVariants({ variant: 'default' })} flex gap-3`}> <Dumbbell size={18} /> Exercises </Link>
        </div>
      </section>
      <section className="w-1/2 bg-[url('/home-bg.jpg')] object-contain object-bottom h-screen flex justify-center items-center flex-col">
        <div className="bg-black bg-opacity-70 w-full h-screen">
          <div className="h-screen items-center flex">
            <Image src="/detraining-logo.png" width={2300} height={1200} quality={100} alt="Devning+" className="drop-shadow-xl invert w-[130px] sm:w-[340px] mx-auto items-center h-fit" />
          </div>
        </div>
      </section>
    </main>
  );
}
