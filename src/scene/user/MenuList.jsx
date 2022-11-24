import { Box, ListItemButton, ListItemIcon, ListItemText, Paper, useTheme } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { tokens } from '../../theme';
import Person from '@mui/icons-material/Person';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Logout from '@mui/icons-material/Logout';

const data = [
    {icon: <Person />, label: "Account"},
    {icon: <ShoppingBag />, label: "Orders"},
    {icon: <ManageAccounts />, label: "Account Data & Addresses"},
    {icon: <Logout />, label: "Logout"},
]

const MenuList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Account");

  return (
    <Box>
        <Paper elevation={0} sx={{ maxWidth: 256, padding: "20px" }} >
            {data.map((item) => (
                <ListItemButton
                    key={item.label.replaceAll(' ', '_')}
                    selected={selected === item.label}
                    sx={{ 
                        py: 0, minHeight: 40, color: colors.primary[100],
                        "&.Mui-selected": {
                            color: colors.redAccent[500],
                        },
                        " &.Mui-selected:hover": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiListItemIcon-root": {
                            color: selected === item.label ? colors.redAccent[500] : "",
                        },
                    }}
                >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.label}
                        onClick={() => setSelected(item.label)}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                </ListItemButton>
            ))}
        </Paper>
    </Box>
  )
}

export default MenuList