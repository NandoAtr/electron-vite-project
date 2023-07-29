import React from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import {SideBarData} from './SideBarData'



export const NewLeftBar = () => {

    const [toggle, setToggle] = React.useState(false)

  return (
    <nav 
        className={`${toggle 
        ?  ' w-full  sm:w-[20rem] relative bg-black h-full sm:h-screen p-4 border transition-all duration-500 border-solid flex flex-col justify-between overflow-hidden'
        : 'w-full sm:w-[4.8rem] h-[70px] bg-black sm:h-full p-4 border transition-all duration-500 border-solid flex flex-col relative justify-between z-40 '} `}

    >
        <SideBarData
            toggle={toggle}
        />

        <div 
            className='absolute top-2 text-white flex justify-center items-center  w-10 h-10 rounded-full cursor-pointer -right-[0.8rem]'

            onClick={()=>setToggle(!toggle)}

        >
            <span className="block h-0.5 w-8 bg-gradient-to-r from-[#57048a] to-[#4528dc] absolute top-[22px] right-[2rem] sm:hidden rounded"></span>
            <span className="block h-0.5 w-8 bg-gradient-to-r from-[#57048a] to-[#4528dc] right-[2rem] top-[29px] absolute sm:hidden rounded"></span>
            <span className="block h-0.5 w-8 bg-gradient-to-r from-[#57048a] to-[#4528dc] absolute top-9 right-[2rem] sm:hidden rounded"></span>
            <BiChevronLeft className={`${!toggle ? 'sm:rotate-180 hidden sm:block sm:text-3xl sm:transition-all duration-300' : ' sm:text-3xl sm:transition-all sm:duration-300 sm:block hidden'}`}/>
        </div>
    </nav>
  )
}
