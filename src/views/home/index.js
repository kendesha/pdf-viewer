import { Fragment, useContext } from "react"
import { AuthContext } from "../../context/auth-context"
import { Dashboard } from "../login/dashboard";

import Login from "../login/login";


export const Home = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;

    return <Fragment>
         {!isLoggedIn && <Login/> }
         {isLoggedIn && <Dashboard/> }
    </Fragment>
        
    
}