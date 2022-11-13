import { Button, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';

const steps = ['Proceed To Checkout', 'Place Order', 'Checkout']

const BtnCheckout = ({ step, setActiveStep }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Button
        type="submit"
        variant="contained"
        sx={{
            width: '50%',
            m: "auto",
            p: "10px",
            backgroundColor: colors.redAccent[500],
            fontSize: "0.9rem",
            "&:hover": {
                backgroundColor: colors.primary[100],
                color: colors.primary[900],
            }
        }}
    >{steps[step]}</Button>
  )
}

export default BtnCheckout