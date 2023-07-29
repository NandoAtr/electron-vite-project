import axios from 'axios';
import React, {createContext} from 'react'

type AuthProviderProps = {
  children: React.ReactNode;
};


export const AuthContext = createContext({}) 

function AuthProvider({children}:AuthProviderProps) {

  const [auth, setAuth] = React.useState(true)

  return (
    <AuthContext.Provider value= {{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider