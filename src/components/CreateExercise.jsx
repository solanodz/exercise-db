
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'
import { Input } from './ui/input'
import { addExercise } from '@/server-actions/addExercise'
import { Textarea } from './ui/textarea'

const CreateExercise = () => {


    return (
        <Card>
            <CardHeader>
                <CardTitle className='font-bold tracking-tight'>Add New Exercises Here</CardTitle>
                <CardDescription>Click the button below to add new exercises.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Create here the form that add exercises to DB */}
                {/* Form data --> name, description, video URL, tag?? */}
                <form action={addExercise} className='flex flex-col gap-2'>
                    <Input type="text" placeholder="Name" id='name' name='name' />
                    <Textarea placeholder="Description" id='description' name='description' />
                    <Input type="text" placeholder="Video URL" id='video_url' name='video_url' />
                    {/* <Input type="text" placeholder="Tag" id='tag' name='tag' /> */}
                    <Button className='flex gap-3'><PlusCircle /> Add Exercise</Button>
                </form>
            </CardContent>
        </Card>

    )
}

export default CreateExercise
