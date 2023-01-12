import { Box, TextField, useMediaQuery, useTheme } from '@mui/material'
import { useField } from 'formik';
import React from 'react'
import { tokens } from '../../../theme';


const MyTextField = ({ columnWidth, ...props }) => {
    const [field, meta] = useField(props);

    const formattedError = () => 
    Boolean(
        meta.error && meta.touched
    )
    const formattedHelper = () => 
        meta.error && meta.touched ? meta.error : ""

    return (
        <TextField 
            {...field} 
            value={field?.value}
            name={field?.name}
            helperText={formattedHelper()} 
            error={formattedError()} 
            color="secondary"
            label={field?.name.split('.')[1]}
            sx={{ 
                gridColumn: `span ${columnWidth}`,
            }} 
        />
    )
}

const ProfileForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)')

    const formattedName = (field) => `customer.${field}`
  return (
    <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
        }}
    >
        <MyTextField
            name={formattedName('first_name')}
            type="input"  
            columnWidth={2}
        />

        <MyTextField
            name={formattedName('last_name')}
            type="input"  
            columnWidth={2}
        />

        <MyTextField
            name={formattedName('email')}
            type="input"  
            columnWidth={4}
        />

        <MyTextField
            name={formattedName('phone')}
            type="input"  
            columnWidth={4}
        />
    </Box>
  )
}

export default ProfileForm