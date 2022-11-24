import { Box, TextField, useMediaQuery, useTheme } from '@mui/material'
import { getIn } from 'formik'
import React from 'react'
import { tokens } from '../../../theme';

const AddressForm = ({
    type,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)')

    const formattedName = (field) => `${type}.${field}`
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
            type="text"
            label="Country"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.country}
            name={formattedName("country")}
            error={formattedError("country")}
            helperText={formattedHelper("country")}
            color="secondary"
            sx={{ gridColumn: "span 4" }}
        />
        <TextField
            fullWidth
            type="text"
            label="Street Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street1}
            name={formattedName("street1")}
            error={formattedError("street1")}
            helperText={formattedHelper("street1")}
            color="secondary"
            sx={{ gridColumn: "span 2" }}
        />
        <TextField
            fullWidth
            type="text"
            label="Street Address 2 (optional)"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street2}
            name={formattedName("street2")}
            error={formattedError("street2")}
            helperText={formattedHelper("street2")}
            color="secondary"
            sx={{ gridColumn: "span 2" }}
        />
        <TextField
            fullWidth
            type="text"
            label="City"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            name={formattedName("city")}
            error={formattedError("city")}
            helperText={formattedHelper("city")}
            color="secondary"
            sx={{ gridColumn: "span 2" }}
        />
        <TextField
            fullWidth
            type="text"
            label="State"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.state}
            name={formattedName("state")}
            error={formattedError("state")}
            helperText={formattedHelper("state")}
            color="secondary"
            sx={{ gridColumn: "1fr" }}
        />
        <TextField
            fullWidth
            type="text"
            label="Zip Code"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.zipCode}
            name={formattedName("zipCode")}
            error={formattedError("zipCode")}
            helperText={formattedHelper("zipCode")}
            color="secondary"
            sx={{ gridColumn: "1fr" }}
        />
    </Box>
  )
}

export default AddressForm