'use client'

import { useClient, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Loader2, PlusCircle } from 'lucide-react'
import { Input } from './ui/input'
import { addExercise } from '@/server-actions/addExercise'
import { Textarea } from './ui/textarea'

const CreateExercise = () => {

    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(); // Create a reference to the form

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(formRef.current); // Use the form reference here
        await addExercise(formData);
        setIsLoading(false);
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle className='font-bold tracking-tight'>Agregar un nuevo ejercicio</CardTitle>
                <CardDescription>Recuerda completar todos los campos antes de agregar el ejercicio</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Create here the form that add exercises to DB */}
                {/* Form data --> name, description, video URL, tag?? */}
                <form ref={formRef} action={addExercise} className='flex flex-col gap-2'>
                    <Input type="text" placeholder="Nombre del ejercicio" id='name' name='name' />
                    <Textarea placeholder="Descripción o información adicional" id='description' name='description' />
                    <Input type="text" placeholder="Link del video" id='video_url' name='video_url' />
                    {/* <Input type="text" placeholder="Tag" id='tag' name='tag' /> */}
                    <Button onClick={handleSubmit} className='flex gap-3'>{isLoading ? <Loader2 className='animate-spin' /> : <PlusCircle />} Agregar Ejercicio</Button>
                </form>
            </CardContent>
        </Card>

    )
}

export default CreateExercise
