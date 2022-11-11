import { Badge, Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext, tokens } from '../../theme'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { logout } from '../../services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../../context/AuthContext';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { setIsCartOpen } from "../../redux/cartSlice";
import { useRef } from 'react';
import { useLayoutEffect } from 'react';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const stickyHeader = useRef()
    useLayoutEffect(() => {
      const mainHeader = document.getElementById('mainHeader')
      let fixedTop = stickyHeader.current.offsetTop
      const fixedHeader = () => {
        if (window.pageYOffset > fixedTop) {
          mainHeader.classList.add('fixedTop')
        } else {
          mainHeader.classList.remove('fixedTop')
        }
      }
      window.addEventListener('scroll', fixedHeader)
    }, [])

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
    <Box display='flex' justifyContent="space-between" p={2} className="mainHeader" id="mainHeader" ref={stickyHeader} backgroundColor={colors.primary[900]}>

        {/* Logo */}
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontSize="1.5rem"
        >
            <Typography
                variant="h2"
                fontWeight="bold"
                onClick={() => navigate("/")}
                sx={{ "&:hover": { cursor: "pointer" } }}
                color={colors.redAccent[500]}
            >
                ECOMMER
            </Typography>
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
                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                marginRight: "8px",
                                marginTop: "6px"
                            }
                        }}
                    >
                        <IconButton 
                            onClick={() => dispatch(setIsCartOpen({}))}
                        >
                            <ShoppingBagOutlinedIcon />
                        </IconButton>
                    </Badge>
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