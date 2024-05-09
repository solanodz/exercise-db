'use client'
import React, { useState, useEffect } from 'react';
import ExercisesList from '@/components/ExercisesList';
import { createClient } from '@/utils/supabase/client';

const ExercisesPage = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        async function fetchExercises() {
            const supabase = createClient();
            const { data } = await supabase.from("exercises").select();
            setExercises(data);
        }
        fetchExercises();
    }, []);

    return (
        <div className="mx-auto max-w-xl py-8 px-4">
            <ExercisesList initialExercises={exercises} />
        </div>
    );
};

export default ExercisesPage;
