'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function googleLogin() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    })



    /* 
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NEXT_PUBLIC_SUPABASE_URL + '/auth/callback',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                }
            }
        })
    
        console.log(supabase.auth.getSession());
    
        if (error) {
            redirect('/error')
        }
    
        revalidatePath('/', 'layout')
        redirect('/') */
}