import { useEffect } from "react"
import { axiosPrivate } from "./axios"
import { useLocation, useNavigate } from 'react-router-dom';

const UseAxiosPrivate = () => {
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


    return axiosPrivate;
}

export default UseAxiosPrivate