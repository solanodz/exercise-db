'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function updateExercise(formData) {

    const id = formData.get('id')
    const name = formData.get('name')
    const description = formData.get('description')
    const video_url = formData.get('video_url')
    const tag = formData.get('tag')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession();

    const user = session?.user
    if (!user) {
        console.error('⚠️ User is not logged in!!!!!')
        return;
    }

    const { data, error } = await supabase
        .from('exercises')
        .update(
            {
                name,
                description,
                video_url,
                // tag
            }
        ).match({ id, user_id: user.id })

    if (error) {
        console.error('⚠️ Error updating data!!!!', error)
        return;
    }

    revalidatePath('/exercises')

    return { message: '✅ Success' }
}