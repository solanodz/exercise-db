import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
      <h1 className="font-black text-5xl tracking-tighter text-slate-800">The Exercise DB</h1>
      <div className="flex gap-2">
        <Link href="/private" className={buttonVariants({ variant: 'outline' })}>Soy Administrador</Link>
        <Link href="/exercises" className={buttonVariants({ variant: 'default' })}>Buscar Ejercicios</Link>
      </div>
    </main>
  );
}
