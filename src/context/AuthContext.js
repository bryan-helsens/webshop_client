/* import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../services/AuthService";

const Auth = createContext();

export const AuthContext = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currency, setCurrency] = useState("€")

    useEffect(() => {
        if (auth?.user !== undefined){
            setIsLoggedIn(true)
            sessionStorage.setItem("user", JSON.stringify(auth))
        }
    }, [auth]) 
 
    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            console.log(cuser);

            if (cuser === null || cuser === {}) {
                sessionStorage.setItem('user', '');
                cuser = ''
                setIsLoggedIn(false);
                setAuth({})
            }else{
                setAuth(cuser)
                setIsLoggedIn(true);
            }
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
        <Auth.Provider value={{ isLoggedIn, setIsLoggedIn, auth, setAuth, currency }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext;


export const AuthState = () => {
    return useContext(Auth);
};  */