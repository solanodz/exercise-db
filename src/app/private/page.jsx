
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default async function PrivatePage() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div>
            <Card className='m-5 pt-6'>
                <CardContent className='flex justify-between items-center'>
                    <CardTitle className='font-bold tracking-tight text-muted-foreground'>Hello <span className='text-black'>{data.user.email}</span></CardTitle>
                    <form action={logout}>
                        <Button>Sign out</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}