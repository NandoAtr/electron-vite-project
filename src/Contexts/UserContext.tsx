import axios from 'axios';
import React, {createContext} from 'react'
import { axiosPrivate } from '../Common/http/axiosPrivate';

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({}) 

function UserProvider({children}:UserProviderProps) {

    const [user, setUser] = React.useState({})

    React.useEffect(() => {

        ( async()=>{
            const {data} = await axiosPrivate('users/me')

            setUser(data.user)
        })()

    }, [])
  
    return (
      <UserContext.Provider value= {{ user }}>
        {children}
      </UserContext.Provider>
    )
  }
  
  export default UserProvider