import { Box, Checkbox, FormControlLabel, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../../theme';
import AddressForm from './AddressForm'

const Shipping = ({
    values, errors, touched, handleBlur, handleChange, setFieldValue
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box m="30px auto">
        {/* Billing Form */}
        <Box>
            <Typography
                sx={{ mb: "15px" }}
                fontSize="18px"
            >
                Billing Information
            </Typography>
            <AddressForm 
                type="billingAddress"
                values={values.billingAddress}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
            />
        </Box>

        <Box mb="20px">
            <FormControlLabel
                label="Same for Shipping Address"
                control={
                    <Checkbox 
                        defaultChecked
                        sx={{ color: `${colors.primary[100]} !important`}}
                        value={values.shippingAddress.isSameAddress}
                        onChange={() => setFieldValue(
                            "shippingAddress.isSameAddress",
                            !values.shippingAddress.isSameAddress
                          )}
                    />
                }
            />
        </Box>

        {/* Shipping Form */}
        {!values.shippingAddress.isSameAddress && (
            <Box>
                <Typography
                    sx={{ mb: "15px" }}
                    fontSize="18px"
                >
                    Shipping Information
                </Typography>
                <AddressForm 
                    type="shippingAddress"
                    values={values.shippingAddress}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                />
            </Box>
        )}
    </Box>
  )
}

export default Shipping