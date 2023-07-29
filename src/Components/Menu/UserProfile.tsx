import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'
import user_icon from '../../assets/user_icon.jpg'

type Props = {
  toggle: boolean
}

export const UserProfile = ({toggle}:Props) => {
    
  const [settings, setSettings] = React.useState(false)

  const { user }:any = useContext(UserContext)


  return (
    <div className='transition-all duration-300 delay-200 '>
      <button
          onClick={()=> setSettings(!settings)}
          className={
            `${toggle 
              ? 'transition-opacity bg-white rounded-lg opacity-80 hover:opacity-100 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2 flex gap-2 items-center p-1 overflow-hidden w-full' 
            
              : 'transition-opacity bg-white rounded-lg opacity-80 hover:opacity-100 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2 flex gap-2 items-center p-1 overflow-hidden max-w-[40px]'
            }`}
      >
          <img
          className="w-8 h-8 rounded-lg shadow-md"
          src={user_icon}
          alt="Ahmed Kamel"
          />
          <span className="text-black">{user?.name}</span>
      </button>
      {settings ? (      
          <div
          className="absolute w-48 py-1 mt-2 origin-bottom-left bg-white rounded-md shadow-lg sm:left-[95%] sm:bottom-[3%] focus:outline-none bottom-14 left-[50%]"
          >
          <Link to="/settings/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
          >Your Profile</Link>

          <Link to="/settings/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
          </div>
      ) : null }
    </div>
  )
}
