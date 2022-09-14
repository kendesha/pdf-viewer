import { createContext, useState, useCallback} from "react";
import { useNavigate } from "react-router-dom";

const defaultValues = 
    {
        isLoggedIn: false,
        token: '',
        role: '',
    
        Login: (token, expirationDate,userRole) => {},
    
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
    const role = localStorage.getItem('role')
    const remainingTime = calculateRemainingTime(expirationTime)

    if (remainingTime <= 60000) {
        return null;
    }
    return {token: storedToken, duration: remainingTime, role: role}
}

export const AuthContextProvider = ({children}) => {

  let initialToken = null;
  let tokenData = {token: null, duration: null,role:null}
  let initialRole = null;
  tokenData = retrieveStoredToken()

  if (tokenData) {
    initialToken = tokenData.token
    initialRole = tokenData.role
  }

  const [token, setToken] = useState(initialToken);
  const [role,setRole] = useState(initialRole);
  const userIsLoggedIn = !!token
  const navigate = useNavigate();
  const dashboards = {"client" : '/client', 'admin' : '/admin'}

    const Login = (token, expirationTime,userRole ) => {
        
        setToken(token)
        setRole(userRole);
        const remainingTime = calculateRemainingTime(expirationTime)

        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token)
            localStorage.setItem('expiration_time', expirationTime)
            localStorage.setItem('role', role)
        }

        logoutTimer = setTimeout(Logout, remainingTime)

        navigate(dashboards[role.toLowerCase()])
    } 

    const Logout = useCallback(
        () => {

            setToken(null)
            setRole(null)

            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('expiration_time')
                localStorage.removeItem('role')
            }

            if (logoutTimer) {
                clearTimeout(logoutTimer)
            }

            navigate("/login")
        },
        [],
    );


    return <AuthContext.Provider value = {{isLoggedIn: userIsLoggedIn, Login: Login, Logout: Logout, token: token, role: role}}>
            {children}
    </AuthContext.Provider>
}

