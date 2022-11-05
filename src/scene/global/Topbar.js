import { Box, Button, IconButton, InputBase, useTheme } from '@mui/material';
import React, { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { logout } from '../../services/AuthService';
import { Link } from 'react-router-dom';
import { AuthState } from '../../context/AuthContext';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const { isLoggedIn, setIsLoggedIn, setAuth } = AuthState()

    const signOut = async () => {
        console.log("logout");
        const res = await logout()

        console.log(res, 'logout');

        if (res.status === 200 || res.request.status === 200){
            setAuth({})
            setIsLoggedIn(false)
        }
    }

  return (
    <Box display='flex' justifyContent="space-between" p={2}>

        {/* Search Bar */}
        <Box 
        display='flex' 
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1}}>
                <SearchIcon />
            </IconButton>
        </Box>

        {/* Icons */}
        <Box display='flex'>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
    

            {isLoggedIn ? 
                (<>
                    <IconButton>
                        <NotificationsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <PersonOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <LogoutIcon onClick={signOut} />
                    </IconButton>
                </>)
            :
               (<Box ml="5px" sx={{ display: "flex", gap: "10px"}}>
                    <Button component={Link} to="/login" variant="contained" sx={{ backgroundColor: colors.blueAccent[700] }}>Login</Button>
                    <Button component={Link} to="/register" variant="contained" sx={{ backgroundColor: colors.blueAccent[700] }}>Register</Button>
               </Box>)
            }
        </Box>
    </Box>
  )
}

export default Topbar