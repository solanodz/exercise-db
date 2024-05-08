import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
      <h1 className="font-black text-6xl tracking-tighter text-slate-800">Devning +</h1>
      <p className="tracking-tight text-slate-600 font-medium max-w-sm text-center">Desarrollamos un software para que desarrolles entrenamientos para tus clientes.</p>
      <div className="flex gap-2">
        <Link href="/private" className={buttonVariants({ variant: 'outline' })}>Soy Administrador</Link>
        <Link href="/exercises" className={buttonVariants({ variant: 'default' })}>Buscar Ejercicios</Link>
      </div>
    </main>
  );
}
