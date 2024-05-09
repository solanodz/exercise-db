import { buttonVariants } from "@/components/ui/button";
import { montserrat } from "@/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex md:flex-row flex-col items-center gap-3 bg-slate-600">
      <section className="w-full h-screen justify-center md:w-1/2 sm:p-0 p-4 flex flex-col items-center mx-auto text-center md:text-left max-w-lg">
        <h1 className={`${montserrat.className} antialiased font-black text-4xl sm:text-6xl tracking-tight text-left text-white`}>Bienvenidos a Detraining</h1>
        <p className="tracking-tight text-slate-400 font-medium text-left sm:text-md text-sm w-full">Desarrollamos software para que desarrolles entrenamientos para tus clientes.</p>
        <div className="flex gap-2 md:flex-row flex-col">
          <Link href="/private" className={buttonVariants({ variant: 'link' })}>Soy Administrador</Link>
          <Link href="/exercises" className={buttonVariants({ variant: 'default' })}>Buscar Ejercicios</Link>
        </div>
      </section>
      <section className="w-full md:w-1/2 bg-black h-screen flex justify-center items-center flex-col">
        <div className="">
          <Image src="/detraining-logo.png" width={2300} height={1200} quality={100} alt="Devning+" className="drop-shadow-xl invert w-[130px] sm:w-[340px] h-fit" />
        </div>
      </section>
    </main>
  );
}
