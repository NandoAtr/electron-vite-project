import React from 'react'
import { BsShop } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {TbLogout} from 'react-icons/tb'
import { UserProfile } from './UserProfile'
import { DarkModeButton } from '../DarkMode/DarkModeButton'
import webspyLogo from '../../assets/webspyLogo.png'
import { BiHelpCircle, BiSupport } from 'react-icons/bi'
import { MdForum } from 'react-icons/md'
import {IoNotificationsSharp} from 'react-icons/io5'
import {Notification} from '../Notification/Notification.jsx'
import { axiosPrivate } from '../../Common/http/axiosPrivate'

type Props = {
    toggle: boolean
  }


export const SideBarData = ({toggle}:Props) => {

  const [notifications, setNotifications]=React.useState(false)

  async function logout(){
    const logout = await axiosPrivate.get('auth/logout');

    document.cookie = 'refreshToken2' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refreshToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'accessToken2' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'accessToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';


    if(logout.status === 200){
      window.location.href = '/login'
    }

  }

  return (
    <>
      <Link to='/home' className='max-w-[40px] flex items-center mb-4'>
        <img src={webspyLogo} alt="" />
        {toggle ? <span className='ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-4xl'>Webspy</span> : <span className='ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-4xl sm:hidden'>Webspy</span>}
      </Link >
      <div className='overflow-hidden flex flex-col gap-4'>
        <Link to="/" className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg">
          <span className="p-3 bg-indigo-700 rounded-lg">
            <BsShop className='text-xl mx-auto' />
          </span>
          <span>Suas Ferramentas</span>
        </Link>
        <Link to="/settings/profile" className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg">
          <span className="p-3 bg-indigo-700 rounded-lg">
            <MdForum className='text-xl mx-auto' />
          </span>
          <span>Forum</span>
        </Link>
        <a href='https://wa.me/5582993928248?text=Oii%2C+estou+precisando+de+ajuda' target='_blank' className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg">
          <span className="p-3 bg-indigo-700 rounded-lg">
            <BiSupport className='text-xl mx-auto' />
          </span>
          <span>Suporte</span>
        </a>
        <Link to="/settings/profile" className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg">
          <span className="p-3 bg-indigo-700 rounded-lg">
            <BiHelpCircle className='text-xl mx-auto' />
          </span>
          <span>Como Funciona?</span>
        </Link>
        <button 
          onClick={()=>setNotifications(!notifications)}
          className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
        >
          <span className="p-3 bg-indigo-700 rounded-lg">
            <IoNotificationsSharp className='text-xl mx-auto' />
          </span>
          <span>Notícias</span>
        </button>
      </div>
      {
        notifications ? (
          <Notification/> 
        ) : null 
      }


      <div 
        className={`${toggle 
          ? 'flex flex-col w-full gap-8 text-white ' 
          : 'md:flex flex-row sm:flex-col gap-8 mx-auto text-white items-center justify-center hidden'}`}
      >
        
        <UserProfile
          toggle={toggle}
        />
        <div 
          onClick={()=> logout()} 
          className=' flex w-full cursor-pointer'
        >
          <TbLogout className={`${toggle ? 'text-2xl text-white ' : 'text-2xl text-white mx-auto'}`} />
          {toggle ? <span className='ml-2'>Logout</span> : null}
        </div>

      </div>
    </>
  )
}
