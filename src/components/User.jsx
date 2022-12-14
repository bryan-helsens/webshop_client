import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { AuthState } from '../context/AuthContext';

const User = () => {
  const { auth } = AuthState()

  return (
    <Box m="20px">
        <h2>Users List</h2>
  
        {
          auth !== null
            ? (
              <>
                <ul>
                    <li>{auth?.user?.name} - {auth?.user?.email}</li>
                </ul>
                <Link to="/admin" variant="h5" color='secondary'>Admin</Link>
              </>
                
            ) : <p>No users to display</p>
        }
    </Box>
  )
}

export default User