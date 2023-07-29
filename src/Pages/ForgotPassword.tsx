import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { CiFaceFrown } from 'react-icons/ci'
import { Information } from '../Components/Notification/Information'

export const ForgotPassword = () => {

    const onSubmit = async(data:any) => {
        const response:any = await axios.post('https://api.webspy.com.br/auth/signin',data)  
    }

    const [successfully,setSuccessfully] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [message,setMessage] = React.useState('')


    const { register, handleSubmit, watch, formState: { errors } } = useForm();


  return (
    <form 
        className="relative flex flex-col justify-center  min-h-screen overflow-hidden bg-[#09090D] text-[#828283] text-center p-4 py-[8%]"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className='lg:max-w-xl w-full mx-auto mb-6'>
        <span className='bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom text-xl font-bold'>Forgot Password ?</span>
        <h2 className='text-white font-extrabold text-xl my-3'>Enter your email to reset your password.</h2>
        </div>
        <div className="w-full py-6 px-4 m-auto bg-[#16151A] rounded-md shadow-md lg:max-w-xl text-[#888888] text-left ">
            <div className="mt-6">
                <div className="mb-3">
                    <input
                        placeholder='Digite Seu E-mail'
                        type="email"
                        className="block w-full px-4 py-3 mt-2 text-[#828283] bg-[#09080D]  "
                        {...register("email", { required: true })}
                    />
                </div>
                    {   
                        errors.email?.type === 'required' && 
                        <p className='text-sm text-red-500 opacity-70 ml-1 my-3 mb-1'>
                            É necessario um E-mail para realizar o login
                        </p>
                    }
                <div className="mt-6">
                    <button 
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transdiv bg-gradient-to-r from-[#57048a] to-[#4528dc] rounded-md "
                    >
                        Login
                    </button>    
                </div>
                <div className="mt-6">
                    <button 
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transdiv bg-gradient-to-r from-[#57048a] to-[#4528dc] rounded-md "
                    >
                        Cancelar
                    </button>    
                </div>
            </div>
        </div>
        {
            successfully 
            ?   <Information
                    title='Login'
                    description='Login realizado com sucesso!'
                    icon={<BsFillCheckCircleFill className="h-6 w-6 text-green-400" aria-hidden="true" />}
                /> 
            : null
        }
        {
            error 
            ?   <Information
                    title='não foi possivel efetuar o login'
                    description={message}
                    icon={<CiFaceFrown className="h-6 w-6 text-red-400" aria-hidden="true" />}
                /> 
            : null
        }
    </form>
  )
}
