"use client"

import Input from '@/components/input/Input'
import { Router } from 'next/router'
import { FormEvent, useState } from 'react'
import axios from 'axios' 
import { useRouter } from 'next/navigation'
import Link from 'next/link'


interface InitialStateProps{
name:string,
email:string,
password:string
}

const initialState:InitialStateProps = {
    name:'',
    email:'',
    password:'',
} 

const page = () => {

    const router = useRouter()

    const [state,setState] = useState(initialState)
    function handleChange (e : any){
        setState({
            ...state,
            [e.target.name]:e.target.value})
    }

    const onSubmit = (event:FormEvent) => {
        event.preventDefault()

        axios.post('/api/register',state)
        .then(()=>{
            router.refresh()
        })
        .then(()=>{
            setTimeout(()=>{
                router.push('/login')
               },2500)
        })
        .catch((err:any)=>{
            
        })
     
    }
  return (
    <form className='text-center'  onSubmit={onSubmit}>
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
            <Input placeholder='Name' name='name'  id='name' type='text' onChange={handleChange} value={state.name}/>
            <Input placeholder='Email' name = 'email' id='email' type='email' onChange={handleChange} value={state.email}/>
            <Input name= 'password' placeholder='Password' id='password' type='password' onChange={handleChange} value={state.password}/>
            <button type='submit'  >Submit</button>

        </div>
        <div>
            Do you have an account ? <Link href='/login'>Sign In</Link>
        </div>
      
    </form>
  )
}

export default page
