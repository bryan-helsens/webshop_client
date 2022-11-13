import { Button, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';

const BtnBack = ({ step, setActiveStep }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Button
        sx={{
            width: '50%',
            m: "auto",
            p: "10px",
            backgroundColor: colors.primary[900],
            fontSize: "0.9rem",
            "&:hover": {
                backgroundColor: colors.primary[100],
                color: colors.primary[900],
            }
        }}
 
        variant="contained"

        onClick={() => {setActiveStep(step - 1)}}
    >Back</Button>
  )
}

export default BtnBack