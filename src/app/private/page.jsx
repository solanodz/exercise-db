
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
import UpdateExercise from '@/components/UpdateExercise';
import Image from 'next/image';


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

        <div className='p-5 flex flex-col gap-4 max-h-screen '>
            <section>
                <Card className='flex flex-col sm:flex-row items-center justify-between'>
                    <CardHeader className='flex flex-col'>
                        <CardTitle className='font-bold tracking-tight text-slate-400'>Hello <span className='text-black'>{user?.user.email}</span> 👋🏽</CardTitle>
                        <CardDescription>Here you can add new exercises to your database</CardDescription>
                    </CardHeader>
                    <form action={logout} className='p-6 ml-auto flex gap-3 items-center'>
                        <Link href='/'>
                            <Image src='/detraining-logo.png' width={100} height={100} alt='Devning+' />
                        </Link>
                        <Button className='flex ml-auto'>Sign out</Button>
                    </form>
                </Card>
            </section>
            <section className='grid grid-rows-2 sm:grid-cols-2 gap-4'>
                <CreateExercise />
                <Card className='flex flex-col justify-between'>
                    <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle className='font-bold tracking-tight flex gap-2'><Dumbbell />Your exercises</CardTitle>
                            <Badge className='w-fit text-xl'>{exercises.length}</Badge>
                        </div>
                        <CardDescription>These are the exercises you&apos;ve been adding so far.</CardDescription>
                        <Link href='/exercises' className='py-2 text-sm flex items-center gap-2 hover:gap-5 hover:underline font-medium duration-200'>All exercises<ArrowRight size={18} /></Link>
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
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your
                                                    exercise and remove your data from our servers.
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

                                    <UpdateExercise exercise={exercise} />
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                    <CardDescription className='p-6 text-center text-xs tracking-tight items-end'>Click the exercises to see more details</CardDescription>
                </Card>
            </section>
        </div >
    )
}