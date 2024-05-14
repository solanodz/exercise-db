import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { logout } from '../app/private/actions'

import { ClipboardPen, Dumbbell, LogOut } from 'lucide-react'

const PrivateNav = () => {
    return (
        <div>
            <section className='flex px-5 flex-col sm:flex-row items-center justify-between bg-white border-b border-slate-300'>
                <div className='flex py-4 flex-row gap-3 items-center'>
                    {/* <h2 className='font-bold text-lg tracking-tight text-slate-900'>{user?.user.email}👋🏽</h2>
                        <p className='text-xs max-w-sm'>Desde acá vas a poder agregar ejercicios y entrenamientos</p> */}
                    <Link href='/'>
                        <Image src='/detraining-logo.png' width={100} height={100} alt='Devning+' />
                    </Link>
                    <Link href='/private' className={buttonVariants({ variant: 'default' })}>Dashboard</Link>
                    <Link href='/private/add-session' className={`${buttonVariants({ variant: 'link' })} flex gap-2`}><ClipboardPen size={20} /> Agregar entrenamiento</Link>
                    <Link href='/private/add-exercise' className={`${buttonVariants({ variant: 'link' })} flex gap-2`}><Dumbbell size={20} /> Agregar ejercicios</Link>
                </div>

                <form action={logout} className=' ml-auto flex gap-3 items-center'>
                    <Button className='flex ml-auto gap-2' variant='outline'><LogOut size={18} /> Cerrar sesión</Button>
                </form>

            </section>
        </div>
    )
}

export default PrivateNav
