
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { logout } from './actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ClipboardPen, Dumbbell, Edit, Paperclip, Trash } from 'lucide-react'
import CreateExercise from '@/components/CreateExercise'
import { Badge } from '@/components/ui/badge'
import deleteExercise from '@/server-actions/deleteExercise'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';
import UpdateExercise from '@/components/UpdateExercise';
import Image from 'next/image';
import PrivateNav from '@/components/PrivateNav';


export default async function PrivatePage() {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: user } = await supabase.auth.getUser(); // Get the user object

    if (!user) {
        return redirect('/login')
    }

    const { data: exercises, error } = await supabase
        .from('exercises')
        .select('*')

    if (error || !user?.user) {
        redirect('/login')
    }

    if (error) {
        console.error('Error fetching exercises')
    }

    return (

        <div className='flex flex-col gap-4'>
            <PrivateNav />
            <section className='px-4 flex flex-col gap-4'>
                <h1 className='text-3xl tracking-tight font-bold text-slate-500'>{user?.user.email} 👋🏽</h1>
                <div className='tracking-tight text-muted-foreground'>
                    <p>Este es tu panel de administrador, desde acá vas a poder agregar ejercicios y entrenamientos.</p>
                    <p>Recordá actualizar los entrenamientos cada semana para brindar el mejor servicio personalizado a tus clientes.</p>
                </div>
                <h3 className='font-semibold tracking-tight text-muted-foreground'>Cada entrenador deberá agregar las sesiones de entrenamiento que le corresponden para cada cliente.</h3>
            </section >
        </div >
    )
}