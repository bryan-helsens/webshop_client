import { Button, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { tokens } from '../../theme';

const BtnAddToCart = ({ quantity, product, size }) => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Button
        sx={{
            minWidth: '100px',
            padding: size !== "small" ? '10px 40px' : '',
            backgroundColor: colors.redAccent[500],
            fontSize: "0.9rem",
            "&:hover": {
                backgroundColor: colors.primary[100],
                color: colors.primary[900],
            }
        }}
 
        variant="contained"

        onClick={() => {
          dispatch(addToCart({ item: { ...product, quantity }}));
        }}
    >ADD TO CART</Button>
  )
}

export default BtnAddToCart