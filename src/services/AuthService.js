import axios, { axiosPrivate } from "../api/axios"

export const isAuthenticated = () => {
    const user = sessionStorage.getItem('user')

    if (!user){
        return {}
    }

    return JSON.parse(user)
}

const LOGIN_URL = '/api/login'
const LOGOUT_URL = '/api/logout'
const REGISTER_URL = '/api/register'

export const register = async (name, email, password, password_confirmation) => {
    try {
        
        const res = await axios.post(REGISTER_URL, 
            {name, email, password, password_confirmation}
        );

        if (res?.status === 200){
            return res?.data;
        }

        return null;

    } catch (error) {
        console.error(error);
        return error;
    }
}

export const login = async (email, password) => {
    try {
        const res = await axiosPrivate.post(LOGIN_URL, 
            {email, password}
        )

        if (res?.status === 200 && res?.data?.user) {
            return res;
        }
    } catch (err) {
        console.error(err);
    }

    return null;
}

export const logout = async () => {
    try {
        const res = await axiosPrivate.get(LOGOUT_URL);
        
        if (res?.status === 200) {
            return res;
        }

    } catch (err) {
        console.error(err);
    }

}