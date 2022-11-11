import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Menu, MenuItem, Sidebar as ProSidebar } from 'react-pro-sidebar'
import { tokens } from '../../theme';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { AuthState } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
        <MenuItem
            active={selected === title}
            style={{
            color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Link to={to}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    )
  }

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    const { auth } = AuthState();

  return (
    <Box
      sx={{
        "& .sidebar": {
          borderRight: "none"
        },
        "& .sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .menu-anchor":{
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor:hover": {
          backgroundColor: "transparent !important",
          color: "#868dfb !important",
        },
        "& .menu-item.active .menu-anchor": {
          color: "#6870fa !important",
        },
      }}
    >
        <ProSidebar collapsed={isCollapsed}>
            <Menu>
                <MenuItem
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                      style={{
                        margin: "10px 0 20px 0",
                        color: colors.grey[100],
                      }}
                >
                    {!isCollapsed && (
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignitems='center'
                            ml="15px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                            ADMIN PANEL
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>

                {/* USER */}

                {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                              alt="profile-user"
                              title="profile-user"
                              width="100px"
                              height="100px"
                              src={`../../assets/user/user.png`}
                              style={{ cursor: 'pointer', borderRadius: "50%" }}
                            />
                        </Box>

                        <Box textAlign="center">
                            <Typography 
                            variant="h2" 
                            color={colors.grey[100]} 
                            fontWeight="bold" 
                            sx={{ m: "10px 0 0 0 "}}
                            >
                            {auth?.user?.name}
                            </Typography>
                            <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            >{auth?.roles}</Typography>
                        </Box>
                    </Box>
                )}

                {/* MENU ITEMS */}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item 
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
            </Menu>
        </ProSidebar>
    </Box>
  )
}

export default Sidebar