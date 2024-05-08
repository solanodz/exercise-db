
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { logout } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Dumbbell, Edit, Trash } from 'lucide-react'
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
        <div className='m-5 flex flex-col gap-4 max-h-screen'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <CardTitle className='font-bold tracking-tight text-muted-foreground'>Hola <span className='text-black'>{user?.user.email}</span> 👋🏽</CardTitle>
                    <form action={logout}>
                        <Button>Sign out</Button>
                    </form>
                </CardHeader>
            </Card>
            <section className='grid grid-rows-2 sm:grid-cols-2 gap-4'>

                <CreateExercise />
                <Card className='flex flex-col justify-between'>
                    <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle className='font-bold tracking-tight flex gap-2'><Dumbbell />Tus Ejercicios</CardTitle>
                            <Badge className='w-fit text-xl'>{exercises.length}</Badge>
                        </div>
                        <CardDescription>Estos son los ejercicios que vas agregando hasta ahora</CardDescription>
                        <Link href='/exercises' className='py-2 text-sm flex items-center gap-2 hover:gap-5 hover:underline font-medium duration-200'>Ver todos los ejercicios<ArrowRight size={18} /></Link>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        {exercises && exercises.map((exercise) => (
                            <Link href={`/exercises/${exercise.id}`} key={exercise.id}>
                                <Card className='flex justify-between items-center p-2 hover:drop-shadow-md duration-200'>
                                    <h2 className='font-bold text-lg'>{exercise.name}</h2>
                                    <div className='flex gap-2'>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost"><Trash size={20} /></Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        account and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <>
                                                        <form action={deleteExercise}>
                                                            <input type='hidden' name='id' value={exercise.id} />
                                                            <AlertDialogAction type='submit' size='sm' className='text-sm'>Delete</AlertDialogAction>
                                                        </form>
                                                    </>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        {/* <Button variant='ghost' size='sm'><Edit size={20} /></Button> */}
                                    </div>

                                </Card>
                            </Link>
                        ))}
                    </CardContent>
                    <CardDescription className='p-6 text-center items-end'>Haz click en un ejercicio para ver más detalles</CardDescription>
                </Card>
            </section>
        </div >
    )
}