import axios from "../api/axios"

export const isAuthenticated = () => {
    const user = sessionStorage.getItem('user')

    if (!user){
        return {}
    }

    return JSON.parse(user)
}

const LOGIN_URL = '/api/login'
const LOGOUT_URL = '/api/logout'

export const login = async (email, password) => {
    try {
        const res = await axios.post(LOGIN_URL, 
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
        const res = await axios.get(LOGOUT_URL, 
            {
                withCredentials: true,      
            }
        )
        if (res?.status === 200) {
            return res;
        }

    } catch (err) {
        console.error(err);
    }

}