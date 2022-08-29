import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context"

export const Dashboard = () => {

    const authContext = useContext(AuthContext)

    const token = authContext.token;

    const LogoutHandler = () => {
        authContext.Logout()
    }

    return <div>
        <h1>Dashboard {token}</h1>
        <button onClick={LogoutHandler}>Logout</button>
    </div>
}