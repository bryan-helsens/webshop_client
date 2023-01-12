import { Box, Button, Divider, IconButton, LinearProgress, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { tokens } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { IMAGE_STORAGE_URL } from '../../api/URL'
import { selectCurrentUser } from "../../redux/authSlice";
import { useState } from "react";
import { removeProductToCartAPI, updateQuantityAPI } from "../../services/CartService";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
  
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
    const user = useSelector(selectCurrentUser);

    const removeProductToCart = async (product_id) => {
        const res = await removeProductToCartAPI(product_id, user);
    }

    const updateQuantity = async (product, quantity, type) => {
        (type === '-') ? quantity-- : quantity ++;

        if (quantity > 0 && quantity <= product.max_qty) {
            const res = await updateQuantityAPI(product.id, user, quantity);
        }
    }
    

  return (
    <Box 
        display={isCartOpen ? 'block' : 'none'}
        backgroundColor="rgba(0, 0, 0, 0.4)"
        position="fixed"
        zIndex={10}
        width="100%"
        height="100%"
        left="0"
        top="0"
        overflow="auto"
    >
        {loading ? 
        (
            <LinearProgress color="secondary" />
        ) : (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor={colors.primary[900]}
            >
                <Box padding="30px" overflow="auto" height="100%">
                    {/* Header */}
                    <FlexBox mb="15px" sx={{ alignItems: "baseline !important" }}>
                        <Header title={`SHOPPING BAG (${cart?.length})`} subtitle=""/>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>

                    {/* Cart List */}

                    {cart?.length === 0 || cart === null ? (
                        <Box>
                            <Typography fontWeight="bold" variant="h2" color={colors.redAccent[500]}>Cart is Empty</Typography>
                        </Box>
                    ) : (
                        <Box>
                            <Box>
                                {cart?.map((item) => (
                                    <Box key={`${item?.name}-${item?.id}`}>
                                        <FlexBox p="15px 0">
                                            <Box flex="1 1 40%">
                                                <img
                                                    alt={item?.name}
                                                    title={item?.name}
                                                    width="130px"
                                                    height="175px"
                                                    src={`${IMAGE_STORAGE_URL}${item.image}`}
                                                />
                                            </Box>

                                            <Box flex="1 1 60%">
                                                <FlexBox mb="5px">
                                                    <Typography fontWeight="bold" variant="h4">
                                                        {item.name}
                                                    </Typography>
                                                    <IconButton
                                                        sx={{ mt: "-10vh" }}
                                                        onClick={() => {
                                                            dispatch(removeFromCart({ id: item.id }));
                                                            if (user) {
                                                                removeProductToCart(item.id);
                                                            }
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </FlexBox>
                                                <FlexBox m="15px 0">
                                                    <Box display="flex" alignItems="center" border={`1.5px solid ${colors.primary[300]}`} mr="20px" p="2px 5px" borderRadius="5%">
                                                        <IconButton onClick={() => {
                                                            dispatch(decreaseCount({ id: item.id }));
                                                            if (user) {
                                                                updateQuantity(item, item.quantity, "-");
                                                            }
                                                        }}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                        <Typography color={colors.grey[100]} sx={{ p: "0 5px" }} fontSize="1rem">{item.quantity}</Typography>
                                                        <IconButton onClick={() => {
                                                            dispatch(increaseCount({ id: item.id }));
                                                            if (user) {
                                                                updateQuantity(item, item.quantity, "+");
                                                            }
                                                        }}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Typography fontWeight="bold" variant="h5">
                                                        € {(item.price * item.quantity).toFixed(2)}
                                                    </Typography>
                                                </FlexBox>
                                            </Box>
                                        </FlexBox>
                                        <Divider />
                                    </Box>
                                ))}
                            </Box>

                            <Box m="20px 0">
                                <FlexBox m="20px 0">
                                    <Typography fontWeight="bold" variant="h4">SUBTOTAL</Typography>
                                    <Typography fontWeight="bold" variant="h4">€ {totalPrice?.toFixed(2)}</Typography>
                                </FlexBox>
                                <Button
                                    sx={{
                                        backgroundColor: colors.redAccent[500],
                                        "&:hover": { backgroundColor: colors.blueAccent[500] },
                                        color: "white",
                                        borderRadius: 0,
                                        minWidth: "100%",
                                        padding: "20px 40px",
                                        m: "20px 0",
                                    }}
                                    onClick={() => {
                                        navigate("/checkout");
                                        dispatch(setIsCartOpen({}));
                                    }}
                                >
                                    CHECKOUT
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        )}
    </Box>
  )
}

export default CartMenu