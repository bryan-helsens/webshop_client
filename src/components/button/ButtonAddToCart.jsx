import { Button, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/authSlice';
import { addToCart } from '../../redux/cartSlice';
import { addProductToCartAPI } from '../../services/CartService';
import { tokens } from '../../theme';

const BtnAddToCart = ({ count, product, size }) => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(selectCurrentUser);

    const addToCartDB = async () => {
      if (user){
        const res = await addProductToCartAPI(product.id, user, count);
        console.log(res);
      }
    }

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
          //dispatch(addToCart({ item: { ...product, count }}));
          addToCartDB();
        }}
    >ADD TO CART</Button>
  )
}

export default BtnAddToCart