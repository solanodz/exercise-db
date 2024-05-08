'use client'

import { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Edit, Loader2, PlusCircle } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { updateExercise } from '@/server-actions/editExercise'

const UpdateExercise = ({ exercise }) => {
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(); // Create a reference to the form
    const [formData, setFormData] = useState({
        name: exercise.name,
        description: exercise.description,
        video_url: exercise.video_url,
        // tag: exercise.tag  // Si también necesitas la propiedad 'tag'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(formRef.current); // Use the form reference here
        await updateExercise(formData);
        setIsLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger><Edit /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar ejercicio</DialogTitle>
                    <DialogDescription>
                        Una vez editado haz clic en el botón para guardar los cambios
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form ref={formRef} className='flex flex-col gap-2'>
                        <Input
                            type="hidden"
                            id='id'
                            name='id'
                            value={exercise.id}
                        />
                        <Input
                            type="text"
                            placeholder="Nombre del ejercicio"
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Textarea
                            placeholder="Descripción o información adicional"
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            placeholder="Link del video"
                            id='video_url'
                            name='video_url'
                            value={formData.video_url}
                            onChange={handleChange}
                        />
                        <Button onClick={handleSubmit} className='flex gap-3'>
                            {isLoading ? <Loader2 className='animate-spin' /> : <PlusCircle />} Actualizar Ejercicio
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateExercise;
