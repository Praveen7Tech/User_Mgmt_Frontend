import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(()=>{
        const Theme = localStorage.getItem("Theme")
        if(Theme === "dark"){
            setDarkTheme(true)
            document.documentElement.classList.add("dark")
        }
    },[])

    const ThemeChange = ()=>{
        const Docroot = document.documentElement
        if(darkTheme){
            Docroot.classList.remove("dark")
            localStorage.setItem("Theme","light")
        }else{
            Docroot.classList.add("dark")
            localStorage.setItem("Theme","dark")
        }
        setDarkTheme(!darkTheme)
    }
  return (
    <ThemeContext.Provider value={{darkTheme, ThemeChange}}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = ()=> useContext(ThemeContext)
