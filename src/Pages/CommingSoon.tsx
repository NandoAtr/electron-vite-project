import React from 'react'
import WebspyLogo from '../assets/webspyLogo.png'
import { Link } from 'react-router-dom'

export const CommingSoon = () => {
  return (
    <div className=' bg-[#16151B] w-full h-screen flex flex-col justify-center items-center'>
        <div className='flex gap-2 items-center'>
            <img className='max-w-[50px]' src={WebspyLogo} alt="" />
            <h1 className='bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl'>Em breve...</h1>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
            Voltar para {" "}
            <Link
                to='/'
                className="font-medium text-purple-600 hover:underline"
            >
                Home
            </Link>
        </p>
    </div>
  )
}
