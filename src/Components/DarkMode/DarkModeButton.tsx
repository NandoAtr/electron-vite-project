import React, {useContext} from 'react'
import  {ThemeContext}  from '../../Contexts/ThemeContext'
import { MdLightMode, MdNightlight } from 'react-icons/md'

export const DarkModeButton = () => {

    const { theme, setTheme }:any = useContext(ThemeContext)

  return (
    <button 
        onClick={()=>setTheme(theme === 'dark' ? 'light' : 'dark')}
        className=' w-8 h-5 md:w-12 md:h-6 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow' 
    >
        <div
            id='toggle'
            className='w-6  dark:bg-slate-700 dark:translate-x-full h-8 md:h-7 md:w-7 rounded-full  transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 flex items-center text-white text-xl'
        >
            {
                theme !== 'dark' ? (
                    <MdLightMode 
                        className='text-2xl'
                    />
                ) : (
                    <MdNightlight 
                        className='text-2xl'
                    />
                )
            }
        </div>
    </button>
  )
}
