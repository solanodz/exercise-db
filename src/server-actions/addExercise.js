'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addExercise(formData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const video_url = formData.get('video_url')
    const tag = formData.get('tag')

    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    if (!user) {
        console.error('⚠️ User is not logged in!!!!!')
        return;
    }

    const { data, error } = await supabase
        .from('exercises')
        .insert([
            {
                name,
                description,
                video_url,
                user_id: user.id,
                // tag
            }
        ])

    if (error) {
        console.error('⚠️ Error inserting data!!!!', error)
        return;
    }

    revalidatePath('/exercises', 'layout')

    return { message: '✅ Success' }
}