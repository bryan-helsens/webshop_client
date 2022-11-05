import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../services/AuthService";

const Auth = createContext();

export const AuthContext = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (auth?.user !== undefined){
            setIsLoggedIn(true)
            sessionStorage.setItem("user", JSON.stringify(auth))
        }
    }, [auth]) 
 
    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser === null) {
                sessionStorage.setItem('user', '');
                cuser = ''
                setIsLoggedIn(false);
                setAuth({})
            }
            setAuth(cuser)
            setIsLoggedIn(true);
        }
        checkLoggedIn();
    },[])
 
    const GetUserDataByRefresh = async () => {
        if (auth?.user === undefined){
            const data = sessionStorage.getItem("user")

            if (data !== null) setAuth(JSON.parse(data)) && setIsLoggedIn(true);
        }
    }

    GetUserDataByRefresh()


    return (
        <Auth.Provider value={{ isLoggedIn, setIsLoggedIn, auth, setAuth }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext;


export const AuthState = () => {
    return useContext(Auth);
}; 