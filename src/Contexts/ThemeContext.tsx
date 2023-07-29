import React, { useContext, createContext } from 'react'

type ThemeProviderProps = {
    children: React.ReactNode;
  };

export const ThemeContext = createContext({})


function ThemeContextProvider({ children }:ThemeProviderProps){

    const [ theme,setTheme ] = React.useState(localStorage.getItem('theme') || 'light')

    React.useEffect(()=>{
        
        const root = window.document.documentElement;

        const removeOldTheme = theme === 'dark' ? 'light' : 'dark'

        root.classList.remove(removeOldTheme)
        root.classList.add(theme)
        localStorage.setItem('theme', theme)

    },[theme])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
