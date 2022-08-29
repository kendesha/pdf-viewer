import { createContext, useState } from "react";

const defaultValues = 
    {
        isLoggedIn: false,
        token: '',
    
        Login: (token) => {},
    
        Logout: () => {}
    }

export const AuthContext = createContext(defaultValues);


export const AuthContextProvider = ({children}) => {

  const storedToken = localStorage.getItem('token')
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState(storedToken);
  

    const Login = (token ) => {
        if(token){
            setIsLoggedIn(true)
            setToken(token)
            localStorage.setItem('token', token)
            return
        }
        setIsLoggedIn(false);
    }

    const Logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

    return <AuthContext.Provider value = {{isLoggedIn: isLoggedIn, Login: Login, Logout: Logout, token: token}}>
            {children}
    </AuthContext.Provider>
}

