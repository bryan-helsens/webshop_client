import { Box, ListItemButton, ListItemIcon, ListItemText, Paper, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../components/Header'

import Person from '@mui/icons-material/Person';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Logout from '@mui/icons-material/Logout';
import { tokens } from '../../theme'
import Forms from './Forms'

const data = [
  {icon: <Person />, label: "Account", key: "account"},
  {icon: <ShoppingBag />, label: "Orders", key: "orders"},
  {icon: <ManageAccounts />, label: "Account Data & Addresses", key: "address"},
  {icon: <Logout />, label: "Logout", key: "logout"},
]

const labels = ["account", "orders", "address", "logout"];

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("account");

  return (
    <Box  width="80%" margin="80px auto" textAlign="left">
        <Header title="Account Settings" subtitle="Change your profile and account settings"/>
        
        <Box display="flex">
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
                            onClick={() => setSelected(item.key)}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
              </Box>

              <Forms selected={selected} labels={labels}/>
            </Paper>
        </Box>
    </Box>
  )
}

export default Settings