import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
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

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  
    const totalPrice = cart.reduce((total, item) => {
      return total + item.count * item.price;
    }, 0);

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

        {/* Modal */}
        <Box
            position="fixed"
            right="0"
            bottom="0"
            width="max(400px, 30%)"
            height="100%"
            backgroundColor={colors.primary[500]}
        >
            <Box padding="30px" overflow="auto" height="100%">
                {/* Header */}
                <FlexBox mb="15px" sx={{ alignItems: "baseline !important" }}>
                    <Header title={`SHOPPING BAG (${cart.length})`} subtitle=""/>
                    <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                        <CloseIcon />
                    </IconButton>
                </FlexBox>

                {/* Cart List */}
                <Box>
                    {cart.map((item) => (
                        <Box key={`${item.name}-${item.id}`}>
                            <FlexBox p="15px 0">
                                <Box flex="1 1 40%">
                                    <img
                                        alt={item?.name}
                                        width="123px"
                                        height="164px"
                                        src={`${IMAGE_STORAGE_URL}${item.image}`}
                                    />
                                </Box>

                                <Box flex="1 1 40%">
                                    <FlexBox mb="5px">
                                        <Typography fontWeight="bold">
                                            {item.name}
                                        </Typography>
                                        <IconButton
                                            onClick={() =>
                                                dispatch(removeFromCart({ id: item.id }))
                                            }
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </FlexBox>
                                    <Typography>{item.shortDescription}</Typography>
                                    <FlexBox m="15px 0">
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            border={`1.5px solid ${colors.primary[500]}`}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    dispatch(decreaseCount({ id: item.id }))
                                                }
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{item.count}</Typography>
                                            <IconButton
                                                onClick={() =>
                                                    dispatch(increaseCount({ id: item.id }))
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography fontWeight="bold">
                                            € {item.price}
                                        </Typography>
                                    </FlexBox>
                                </Box>
                            </FlexBox>
                            <Divider />
                        </Box>
                    ))}
                </Box>

                {/* Actions */}
                <Box m="20px 0">
                    <FlexBox m="20px 0">
                        <Typography fontWeight="bold">SUBTOTAL</Typography>
                        <Typography fontWeight="bold">€ {totalPrice}</Typography>
                    </FlexBox>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
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
        </Box>
    </Box>
  )
}

export default CartMenu