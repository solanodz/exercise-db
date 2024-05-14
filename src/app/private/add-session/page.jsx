import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { logout } from '../actions'
import { ClipboardPen, Dumbbell } from 'lucide-react'
import PrivateNav from '@/components/PrivateNav'

const page = async () => {

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
        <div className='flex flex-col gap-4'>
            <PrivateNav />
            <section className='px-4 grid grid-rows-2 sm:grid-cols-2 gap-4'>
                agregar formulario para agregar sesiones y la lista de sesiones
            </section>
        </div>
    )
}

export default page
