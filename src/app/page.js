import { buttonVariants } from "@/components/ui/button";
import { montserrat } from "@/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-3 py-24 bg-slate-400">
      <div>
        <Image src="/detraining-logo.png" width={2300} height={1200} quality={100} alt="Devning+" className="drop-shadow-xl invert w-[230px] h-fit" />
      </div>
      <h1 className={`${montserrat.className} antialiased font-black text-5xl sm:text-8xl tracking-tighter text-white`}>DETRAINING</h1>
      <p className="tracking-tight text-slate-600 font-medium sm:text-md text-sm w-full text-center">Desarrollamos software para que desarrolles entrenamientos para tus clientes.</p>
      <div className="flex gap-2">
        <Link href="/private" className={buttonVariants({ variant: 'link' })}>Soy Administrador</Link>
        <Link href="/exercises" className={buttonVariants({ variant: 'default' })}>Buscar Ejercicios</Link>
      </div>

    </main>
  );
}
