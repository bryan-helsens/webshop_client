import { Box, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useTheme } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Person from '@mui/icons-material/Person';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Logout from '@mui/icons-material/Logout';
import { tokens } from '../../theme'
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import ProfileForms from './ProfileForms';


const data = [
    {icon: <Person />, label: "Profile", key: "profile"},
    {icon: <ShoppingBag />, label: "Orders", key: "orders"},
    {icon: <ManageAccounts />, label: "Profile Data & Addresses", key: "addresses"},
    {icon: <Logout />, label: "Logout", key: "logout"},
]

const labels = ["profile", "orders", "addresses", "logout"];

const ProfileSettings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { item } = useParams()
    const addressRef = useRef('');

    const [selected, setSelected] = useState("");

    useEffect(() => {
        if (item === '' || item === undefined || labels.indexOf(item) < -1) {
            setSelected('profile')
        }else{
            setSelected(item)
        }
    }, [item])
    

    const goToPage = (newSelected) => {
        navigate({pathname: '/profile/settings/' + newSelected});
    }

  return (
    <Box width="80%" margin="80px auto" textAlign="left"  ref={addressRef}>
        <Header title="Profile Details" subtitle="Change your profile and profile settings"/>
        
        <Box display="flex" >
            <Paper elevation={0} sx={{ padding: "20px", width: "100%", display: "flex"}} >  
              <Box sx={{ maxWidth: 256, padding: "20px" }}>
                {data.map((item) => (
                    <ListItemButton
                        key={item.key}
                        selected={selected === item.key}
                        sx={{ 
                            py: 0, minHeight: 40, color: colors.primary[100],
                            "&.Mui-selected": {
                                color: colors.redAccent[500],
                            },
                            " &.Mui-selected:hover": {
                                backgroundColor: colors.primary[400],
                            },
                            "& .MuiListItemIcon-root": {
                                color: selected === item.key ? colors.redAccent[500] : "",
                            },
                        }}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            onClick={() => {
                                setSelected(item.key);
                                goToPage(item.key)
                            }}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
                </Box>
 
                <Box width="80%">
                    <Typography variant="h2" mb="20px" fontWeight="bold">{selected?.toUpperCase()}</Typography>
                    <Box>
                        <ProfileForms selected={selected} labels={labels} addressRef={addressRef}/>
                    </Box>
                </Box>
            </Paper>
        </Box>
    </Box>
  )
}

export default ProfileSettings