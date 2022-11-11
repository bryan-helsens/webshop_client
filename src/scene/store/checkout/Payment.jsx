import { Box, TextField, Typography, useTheme } from '@mui/material';
import React from 'react'

const Payment = ({
    values, errors, touched, handleBlur, handleChange, setFieldValue
}) => {
  return (
    <Box m="30px 0">
        {/* Contact Info */}
        <Box>
            <Typography sx={{ mb: "15px"}} fontSize="18px">Contact Info</Typography>
            <TextField
                fullWidth
                type="email"
                label="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={!!touched.email && !!errors.email}
                sx={{ gridColumn: "span 4", marginBottom: "15px" }}
            />

            <TextField
                fullWidth
                type="text"
                label="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={!!touched.phoneNumber && !!errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
            />
        </Box>
    </Box>
  )
}

export default Payment