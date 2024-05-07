'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const deleteExercise = async (formData) => {

    const exerciseId = formData.get('id')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user

    if (!user) {
        console.error('⚠️ User is not logged in!!!!!')
        return;
    }

    const { error } = await supabase
        .from('exercises')
        .delete()
        .match({ id: exerciseId, user_id: user.id })

    if (error) {
        console.error('Error deleting data', error)
        return;
    }

    revalidatePath('/exercises', 'layout')

    return { message: '✅ Success' }
}

export default deleteExercise
