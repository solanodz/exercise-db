
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ClipboardPen, Dumbbell, Edit, LogOut, Paperclip, Trash } from 'lucide-react'
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

        <div className='flex flex-col gap-4 max-h-screen '>
            <PrivateNav />
            <section className='px-4 grid grid-rows-2 sm:grid-cols-2 gap-4'>
                <CreateExercise />
                <Card className='flex flex-col justify-between'>
                    <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle className='font-bold tracking-tight flex gap-2'><Dumbbell />Ejercicios</CardTitle>
                            <Badge className='w-fit text-xl'>{exercises.length}</Badge>
                        </div>
                        <CardDescription>Estos son los ejercicios que vas agregando hasta ahora</CardDescription>
                        <Link href='/exercises' className='py-2 text-sm flex items-center gap-2 hover:gap-5 hover:underline font-medium duration-200'>Todos los ejercicios<ArrowRight size={18} /></Link>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        {exercises && exercises.map((exercise) => (

                            <Card key={exercise.id} className='flex justify-between items-center p-2 hover:drop-shadow-md duration-200'>
                                <Link href={`/exercises/${exercise.id}`}>
                                    <h2 className='font-bold w-fit text-lg'>{exercise.name}</h2>
                                </Link>
                                <div className='flex gap-2'>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost"><Trash size={20} /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Esto eliminara el ejercicio y toda su información de nuestro servidor.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <>
                                                    <form action={deleteExercise}>
                                                        <input type='hidden' name='id' value={exercise.id} />
                                                        <AlertDialogAction type='submit' size='sm' className='text-sm'>Eliminar</AlertDialogAction>
                                                    </form>
                                                </>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <UpdateExercise exercise={exercise} />
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                    <CardDescription className='p-6 text-center text-xs tracking-tight items-end'>Clic en el ejercicio para ver mas detalles</CardDescription>
                </Card>
            </section>
        </div >
    )
}