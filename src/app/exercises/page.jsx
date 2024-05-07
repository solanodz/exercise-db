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


export default async function Notes() {
    const supabase = createClient();
    const { data: exercises } = await supabase.from("exercises").select();

    return (
        <div className='m-3 flex flex-col gap-3'>
            <h1 className='font-bold text-4xl tracking-tight'>Exercises</h1>
            <section className='grid grid-cols-2 gap-3'>
                <Card>
                    <CardHeader>
                        <CardTitle>Search by Title</CardTitle>
                    </CardHeader>
                    <CardContent className='max-w-5xl flex gap-3'>
                        <Input placeholder='Search exercise' />
                        <Button>Search</Button>
                    </CardContent>
                </Card>
                <Card>
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
            </section>
            <div className='flex flex-col gap-3'>
                {exercises.map((exercise) => (
                    <Card key={exercise.id}>
                        <CardHeader>
                            <CardTitle>{exercise.name}</CardTitle>
                        </CardHeader>
                        <Button href={exercise.video_url}>Watch video</Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}