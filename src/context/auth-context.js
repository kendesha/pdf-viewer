import { createContext, useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";

const defaultValues = 
    {
        isLoggedIn: false,
        token: '',
    
        Login: (token, expirationDate) => {},
    
        Logout: () => {}
    }

export const AuthContext = createContext(defaultValues);

let logoutTimer ;

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime()

    if (!expirationTime) {
        return 0;
    }

    const adjExpirationTime = new Date(expirationTime).getTime()

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const expirationTime = localStorage.getItem('expiration_time')
    const remainingTime = calculateRemainingTime(expirationTime)

    if (remainingTime <= 60000) {
        return null;
    }
    return {token: storedToken, duration: remainingTime}
}

export const AuthContextProvider = ({children}) => {

  let initialToken = null;
  let tokenData = {token: null, duration: null}

  tokenData = retrieveStoredToken()

  if (tokenData) {
    initialToken = tokenData.token
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token
  const navigate = useNavigate();

    const Login = (token, expirationTime ) => {
        
        setToken(token)

        const remainingTime = calculateRemainingTime(expirationTime)

        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token)
            localStorage.setItem('expiration_time', expirationTime)
        }

        logoutTimer = setTimeout(Logout, remainingTime)

        navigate("/client")
    } 

    const Logout = useCallback(
        () => {

            setToken(null)

            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('expiration_time')
            }

            if (logoutTimer) {
                clearTimeout(logoutTimer)
            }

            navigate("/login")
        },
        [],
    );


    return <AuthContext.Provider value = {{isLoggedIn: userIsLoggedIn, Login: Login, Logout: Logout, token: token}}>
            {children}
    </AuthContext.Provider>
}

