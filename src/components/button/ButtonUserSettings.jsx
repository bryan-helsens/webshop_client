import { Button } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react'
import { tokens } from '../../theme';

const ButtonUserSettings = () => {
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
    >Save</Button>
  )
}

export default ButtonUserSettings