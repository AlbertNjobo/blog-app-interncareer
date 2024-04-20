"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState, FormEvent, ChangeEvent } from "react"
import Image from "next/image"
import ImageUpload from '../input/ImageUpload'
import Input from "../input/Input"

interface BlogProps{
    name?:string
    imageSrc?:any
    description?:string
    blogId?:string
}

interface InitialStateProps{
    name:string
    imageSrc:string
    description:string
}

const initialState:InitialStateProps = {
    name:'',
    imageSrc:'',
    description:''
}



export default function BlogId({name,description,imageSrc, blogId}:BlogProps) {

    const router = useRouter()
    const [state,setState] = useState(initialState)
    const [onActive,setOnActive] = useState(false)

    const setCustomValue = (id:any ,value:any) =>{
        setState((prevValues)=>({...prevValues,
            [id]:value}))
        }
        function handleChange(event:ChangeEvent<HTMLInputElement> ) {
            setState({ ...state, [event.target.name]: event.target.value });
        }

        const onDelete = (event:FormEvent) => {

        
      
              event.preventDefault()
              axios.delete(`/api/blogs/${blogId}`)
              .then(() => {
                 
                  router.refresh()
                 
              })
      
              .catch((err) => {
                  throw new Error(err)
              })
              .finally(() => {
                router.push('/')
              })
          }
          const onSubmit = (event:FormEvent) => {
    
            event.preventDefault()
    
            axios.post('/api/blogs/${blogId}',state)
            .then(() => {
                router.refresh()
                // router.push('/')
            })
    
            .catch((err) => {
              throw new Error(err)
            })
            .finally(()=>{

              router.push('/')
            })
            
            
        }
      
  return (
    <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4">
      <div className="flex flex-col border-b-2">
        <span>{name}</span>

      </div>

      <div>
        <span>{description}</span>
      </div>

      <div>
        <Image  alt='Image' src={imageSrc} width={400} height={400}/>
      </div>
      <div className="flex justify-center gap-2">
      <button onClick={()=>setOnActive(!onActive)} className="uppercase">Edit</button>
        <button className="uppercase" onClick={onDelete}>Delete</button>
      </div>

      {onActive && <form onSubmit={onSubmit}>
        <div>
            <ImageUpload value={state.imageSrc} onChange={(value)=>setCustomValue('imageSrc',value)}/>
        </div>
        <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">

            <Input placeholder='Blog header' name = 'name' id='name' type='text' onChange={handleChange} value={state.name}/>
            
            <Input placeholder='Blog content' name = 'description' id='description' type='text' onChange={handleChange} value={state.description}/>
            
            <button type='submit'>Submit</button>

        </div>
        </form>}
    </div>
  )
}
