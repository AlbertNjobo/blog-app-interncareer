"use client"


interface InputProps{
   type:any,
   value:any,
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
   name:string
   textarea?:boolean
   id:string
   placeholder?:string
   big?:boolean

}
const Input = ({type,value,onChange,name,textarea,id,placeholder,big}:InputProps) => {
  return (
    <div>
     < input type = {type} value = {value} onChange = {onChange} name = {name} id= {id} placeholder = {placeholder}
     className={`w-full 
     p-4 
      pt-6
       font-light 
       bg-white
        border-2 
         outline-none
          text-black 
          focus:border-gray-500 ${big ? "h-32" : "h-12"}`} />
    </div>
  )
}

export default Input
