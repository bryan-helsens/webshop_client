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
            {email, password},
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true,
            }
        )

        if (res?.status === 200 && res?.data?.user) {
            const access_token = res?.data?.access_token

            if (access_token) {
                sessionStorage.setItem('user', JSON.stringify(res?.data))
            }

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
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true,      
            }
        )
        
        if (res.status === 200 || res.status === 401) {
            sessionStorage.removeItem('user')
        }

        return res

    } catch (err) {
        console.error(err);

        console.log(err);
        /* if (err.response.status === 401){
            sessionStorage.removeItem('user')
        } */
    }

}