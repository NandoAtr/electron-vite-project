import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Breadcrumb = () => {

    const url = useLocation().pathname.split("/")


  return (
    <div className='text-left whitespace-nowrap flex flex-col w-full ml-[5.5%] py-6 '>
        <span className='text-lg font-semibold capitalize'>{url[url.length - 1]}</span>        
        <div className=''>
            {
                url.map((item, index)=>(
                    <>
                        <Link 
                            className='text-[#a1a5b7] text-sm capitalize'
                            to={`/${item}`} 
                            key={index}
                        >
                            {index === 0  ? item : `${item} > `}
                        </Link>
                    </>

                ))
            }
        </div> 

    </div>
  )
}
