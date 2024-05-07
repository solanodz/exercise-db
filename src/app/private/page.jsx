
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { logout } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, PlusCircle, Trash } from 'lucide-react'
import CreateExercise from '@/components/CreateExercise'
import { Badge } from '@/components/ui/badge'
import deleteExercise from '@/server-actions/deleteExercise'
import { DialogFooter } from '@/components/ui/dialog';
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


export default async function PrivatePage() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    const { data: exercises, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('user_id', user.id)

    if (error) {
        console.error('Error fetching exercises')
    }

    return (
        <div className='m-5 flex flex-col gap-4 max-h-screen'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <CardTitle className='font-bold tracking-tight text-muted-foreground'>Hello <span className='text-black'>{user.email}</span></CardTitle>
                    <form action={logout}>
                        <Button>Sign out</Button>
                    </form>
                </CardHeader>
            </Card>
            <section className='grid grid-cols-2 gap-4'>

                <CreateExercise />
                <Card>
                    <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle className='font-bold tracking-tight'>Your Excercises</CardTitle>
                            <Badge className='w-fit text-xl'>{exercises.length}</Badge>
                        </div>
                        <CardDescription>These are the exercises that you added.</CardDescription>

                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        {exercises && exercises.map((exercise) => (
                            <Card key={exercise.id} className='flex justify-between items-center p-2 hover:drop-shadow-md duration-200'>
                                <h2 className='font-bold text-lg'>{exercise.name}</h2>
                                <p>{exercise.id}</p>
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

                                    <Button variant='ghost' size='sm'><Edit size={20} /></Button>
                                </div>
                            </Card>

                        ))}
                    </CardContent>
                </Card>
            </section>
        </div >
    )
}