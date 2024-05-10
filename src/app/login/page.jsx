'use client'

import { Label } from '@/components/ui/label'
import { googleLogin, login, signup } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {

    const supabase = createClient()

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
        if (error) {
            console.error('Error signing in with Google', error)
        }
    }

    return (
        <Card className='max-w-md mx-3 sm:mx-auto my-24 h-min'>
            <div>
                <CardHeader className='border-b border-slate-300  flex flex-col gap-2'>
                    <div className=''>
                        <CardTitle className='font-bold'>Login as Client</CardTitle>
                        {/* <CardDescription>Ingresa a tu cuenta o crea una para acceder a los ejercicios</CardDescription> */}
                    </div>
                    <form>
                        <Button formAction={loginWithGoogle} className='w-full'><Image src={'/google-logo.png'} height={320} width={400} quality={100} alt='google logo' className='w-10 h-fit' />  Login with Google</Button>
                    </form>
                </CardHeader>
            </div>
            <CardFooter className='flex flex-col w-full gap-4 pt-4'>
                <CardTitle className='font-bold text-left mr-auto'>Login as Administrator</CardTitle>
                <CardDescription>If you are an administrator, log in to your account to add exercises.</CardDescription>

                <form className='flex flex-col gap-3 w-full'>
                    <Label htmlFor="email">Email:</Label>
                    <Input id="email" name="email" type="email" required />
                    <Label htmlFor="password">Password:</Label>
                    <Input id="password" name="password" type="password" required />
                    {/* <Button formAction={signup}>Sign up</Button> */}
                    <Button formAction={login} className='w-full'>Submit</Button>

                </form>
            </CardFooter>
        </Card>
    )
}