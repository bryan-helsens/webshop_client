import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentRoles, selectCurrentUser } from '../redux/authSlice';

const RequireAuth = ({ allowedRoles }) => {
    //const { auth } = AuthState()
    const roles = useSelector(selectCurrentRoles)
    const user = useSelector(selectCurrentUser)
    const location = useLocation();

    return (
        //roles.find(role => allowedRoles?.includes(role))
        allowedRoles?.includes(roles)
            ? <Outlet />
            : user
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth