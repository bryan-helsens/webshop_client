import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthState } from '../context/AuthContext'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = AuthState()
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user 
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth