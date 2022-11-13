import React from 'react'
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_STORAGE_URL } from '../../../api/URL';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../../theme';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import {
    decreaseCount,
    increaseCount,
    removeFromCart
  } from "../../../redux/cartSlice";

const CartTable = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const navigate = useNavigate();

    const TAX_RATE = 0.07;
    const invoiceTaxes = TAX_RATE * totalPrice;
    const invoiceTotal = invoiceTaxes + totalPrice;

    function ccyFormat(num) {
      return `${num.toFixed(2)}`;
    }

  return (
    <Box>
        <Typography
            sx={{ mb: "15px" }}
            fontSize="18px"
        >
            Products
        </Typography>

        
    <Paper sx={{ width: '100%'}}>
        <TableContainer 
            sx={{ 
                maxHeight: 440, 
                "& th": { fontSize: "1.1rem", backgroundColor: colors.redAccent[500] },
                "& .MuiTableCell-root" : { fontSize: "1rem" },
            }}
        >
        <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                    <TableCell align="center" colSpan={2}>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                    <TableCell align="right" width="1%"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody> 
            {cart.map((product, i) => (
                <TableRow key={`${product.name}-${i}`}>
                    <TableCell>
                        <img 
                            alt={product.name}
                            title={product.name}
                            width="100px"
                            height="150px"
                            src={`${IMAGE_STORAGE_URL}${product.image}`}
                            onClick={() => navigate(`/product/${product.id}`)}
                            style={{ cursor: "pointer" }}
                        />
                    </TableCell>
                    <TableCell><Typography variant="h4">{product.name}</Typography></TableCell>

                    <TableCell align="right">
                        <Box display="flex" alignItems="center" width="fit-content" border={`1.5px solid ${colors.primary[300]}`} p="2px 5px" borderRadius="5%" sx={{ float: "right" }}>
                            <IconButton onClick={() => dispatch(decreaseCount({ id: product.id }))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={colors.grey[100]} sx={{ p: "0 5px" }} fontSize="1rem">{product.count}</Typography>
                            <IconButton onClick={() => dispatch(increaseCount({ id: product.id }))}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </TableCell>

                    <TableCell align="right"><Typography variant="h5">€ {product.price}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="h5" color={colors.redAccent[500]}>€ {ccyFormat(product.price * product.count)}</Typography></TableCell>
                    <TableCell>
                        <IconButton
                            onClick={() =>
                                dispatch(removeFromCart({ id: product.id }))
                            }
                        >
                            <CloseIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>

    <Paper sx={{ width: '80%', m: "50px auto" }}>
        <TableContainer 
            sx={{ "& .MuiTableCell-root" : { fontSize: "1rem" }}}
        >
            <Table>
                <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">€ {ccyFormat(totalPrice)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Tax ({`${(TAX_RATE * 100).toFixed(0)} %`})</TableCell>
                    <TableCell align="right">€ {ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">€ {ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
            </Table>
        </TableContainer>

    </Paper>
    </Box>
  )
}

export default CartTable