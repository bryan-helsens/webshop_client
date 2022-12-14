import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../redux/authSlice';

const URL = "http://localhost:8000"

export default axios.create({
    baseURL: URL,
    headers: { 'Content-Type': 'application/json'},
});

export const axiosPrivate = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'},
});


const AxiosInterceptor = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                if (error?.response.status === 401){

                    dispatch(logOut());
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