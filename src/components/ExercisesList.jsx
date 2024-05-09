import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';

const ExercisesList = ({ initialExercises }) => {
    const [exercises, setExercises] = useState(initialExercises);
    const [searchValue, setSearchValue] = useState('');

    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        setExercises(initialExercises);
    }, [initialExercises]);

    return (
        <div className='flex flex-col max-w-xl mx-auto gap-2'>
            <Card className='bg-white'>
                <CardHeader className='flex sm:flex-row flex-col-reverse justify-between'>
                    <div>
                        <CardTitle>Lista de ejercicios</CardTitle>
                        <CardDescription className=''>Escribe el nombre del ejercicio que tenes en tu planilla</CardDescription>
                    </div>
                    <Link href={'/'} className='sm:ml-auto ml-0'>
                        <Image src="/detraining-logo.png" alt="Logo" width={80} height={80} className='mb-3 sm:m-0' />
                    </Link>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        placeholder="Buscar ejercicio"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </CardContent>
            </Card>
            {filteredExercises.map((exercise) => (
                <Link href={`/exercises/${exercise.id}`} key={exercise.id}>
                    <div className='p-3 border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-lg duration-200'>
                        <p className='font-bold text-lg'>{exercise.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ExercisesList;
