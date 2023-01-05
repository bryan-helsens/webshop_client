import { Box } from '@mui/material'
import React from 'react'
import { MyTextField } from '../../components/form_element/TextField'

const RegisterForm = () => {
    const formattedName = (field) => `${field}`

  return (
    <Box
        display="grid" 
        gap="30px"
        sx={{ 
            "& > div": { gridColumn: "span 2"}
        }}
    >
        <MyTextField
            name={formattedName('name')}
            type="input"  
            columnWidth={2}
        />

        <MyTextField
            name={formattedName('email')}
            type="input"  
            columnWidth={2}
        />

        <MyTextField
            name={formattedName('password')}
            type="password"  
            columnWidth={2}
        />

        <MyTextField
            name={formattedName('password_confirmation')}
            type="password"  
            columnWidth={2}
        /> 
    </Box>
  )
}

export default RegisterForm