import { Box, TextField, useMediaQuery, useTheme } from '@mui/material'
import { getIn } from 'formik';
import React from 'react'
import { tokens } from '../../../theme';

const UserForm = ({  values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)')

    console.log(values.email);

    const formattedName = (field) => `user.${field}`
    const formattedError = (field) => 
        Boolean(
            getIn(touched, formattedName(field)) &&
            getIn(errors, formattedName(field))
        )
    const formattedHelper = (field) => 
        getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))

  return (
    <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
        }}
    >
        <TextField
            fullWidth
            type="text"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name={formattedName("firstName")}
            error={formattedError("firstName")}
            helperText={formattedHelper("firstName")}
            color="secondary"
            sx={{ 
                gridColumn: "span 2",
            }}
        />
        <TextField
            fullWidth
            type="text"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name={formattedName("lastName")}
            error={formattedError("lastName")}
            helperText={formattedHelper("lastName")}
            color="secondary"
            sx={{ gridColumn: "span 2" }}
        />
        <TextField
            fullWidth
            type="email"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name={formattedName("email")}
            error={formattedError("email")}
            helperText={formattedHelper("email")} 
            color="secondary"
            sx={{ gridColumn: "span 4" }}
        />
        <TextField
            fullWidth
            type="text"
            label="Phone"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            name={formattedName("phone")}
            error={formattedError("phone")}
            helperText={formattedHelper("phone")}
            color="secondary"
            sx={{ gridColumn: "span 4" }}
        />
    </Box>
  )
}

export default UserForm