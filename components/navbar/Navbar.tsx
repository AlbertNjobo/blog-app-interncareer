'use client'

import getCurrentUser from '@/app/actions/getCurrentUser'
import { SafeUser } from '@/types'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import {User} from '@prisma/client'
import React from 'react'

interface UserMenuProps {
    currentUser: SafeUser | null
  }


export default function Navbar({currentUser}:UserMenuProps) {


  return (
    <header>
         <nav className='bg-gray-200 flex justify-between px-4 py-6 shadow-xl'>
            <div>{currentUser?.name}</div>

            <div className='flex gap-4'>
            <Link href='/'>Home</Link>
            <Link href={currentUser ? '/create' : '/register'}>Create</Link>
            {currentUser ? <button onClick={() => signOut()}>Sign out</button> : <Link href='/register'>Register</Link>}
            </div>
        </nav>
    </header>
  )
}