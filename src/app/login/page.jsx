import { Label } from '@/components/ui/label'
import { login, signup } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
    return (
        <Card className='max-w-md mx-3 sm:mx-auto my-24 h-min'>
            <CardHeader>
                <CardTitle className='font-bold'>Ingresa a tu cuenta</CardTitle>
                <CardDescription>Si eres administrador, ingresa a tu cuenta para agregar ejercicios.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-3'>
                    <Label htmlFor="email">Email:</Label>
                    <Input id="email" name="email" type="email" required />
                    <Label htmlFor="password">Password:</Label>
                    <Input id="password" name="password" type="password" required />
                    {/* <Button formAction={signup}>Sign up</Button> */}
                    <Button formAction={login} className='w-full'>Log in</Button>

                </form>
            </CardContent>
        </Card>
    )
}