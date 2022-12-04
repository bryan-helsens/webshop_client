import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default axios.create({
    baseURL: 'http://localhost:8000',
});

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'},
});


const AxiosInterceptor = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                if (error?.response.status === 401){
                    navigate('/login', { state: { from: location }, replace: true })
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [])


    return children;
}

export { AxiosInterceptor }