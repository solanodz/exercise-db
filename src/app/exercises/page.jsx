import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/server';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';


export default async function Exercises() {
    const supabase = createClient();
    const { data: exercises } = await supabase.from("exercises").select();

    return (
        <div className='m-2 flex flex-col gap-3 max-w-xl m-2 sm:mx-auto sm:my-12'>
            <h1 className='font-bold text-4xl tracking-tight'>Exercises</h1>
            <section className=''>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Search by Title</CardTitle>
                    </CardHeader>
                    <CardContent className='max-w-5xl flex gap-3'>
                        <Input placeholder='Search exercise' />
                        <Button>Search</Button>
                    </CardContent>
                </Card>
                {/* 
                <Card className='sm:flex flex-col hidden'>
                    <CardHeader>
                        <CardTitle>Search by Tag</CardTitle>
                    </CardHeader>
                    <CardContent className='max-w-5xl flex gap-3'>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card> 
                */}
            </section>
            <div className='flex flex-col gap-3'>
                {exercises.map((exercise) => (
                    <Link href={`/exercises/${exercise.id}`} key={exercise.id}>
                        <div className='p-3 border border-slate-200 rounded-lg drop-shadow-sm hover:shadow-lg duration-200'>
                            <p className='font-bold tracking-tight text-lg'>{exercise.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}