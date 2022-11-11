import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tokens } from "../theme";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { IMAGE_STORAGE_URL } from "../api/URL";

const Item = ({ item, width }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [count, setCount] = useState(1)
    const [isHovered, setIsHovered] = useState(false)
    const { category, price, name, image } = item;

  return (
    <Box width={width} display="flex" flexDirection="column">
        <Box
          position="relative"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
           <img 
            alt={item.name}
            width="300px"
            height="400px"
            src={`${IMAGE_STORAGE_URL}${item.image}`}
            onClick={() => navigate(`/item/${item.id}`)}
            style={{ cursor: "pointer" }}
           /> 
           <Box
            display={isHovered ? "block" : "none"}
            position="absolute"
            bottom="10%"
            left="0"
            width="100%"
            padding="0 5%"
           >
            <Box display="flex" justifyContent="space-between">
                <Box
                display="flex"
                alignItems="center"
                backgroundColor={colors.redAccent[500]}
                borderRadius="3px"
                >
                  <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                      <RemoveIcon />
                  </IconButton>
                  <Typography color={colors.grey[900]} fontSize="1rem">{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                      <AddIcon />
                  </IconButton>
                </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ 
                backgroundColor: colors.primary[900],
                "&:hover": { backgroundColor: "white", color: "black" },
                color: "white"
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box pt="3px" mt="auto">
        <Typography variant="subtitle2" color={colors.primary[100]}>
          {category?.name}
        </Typography>
        <Typography color={colors.secondary} fontWeight="bold" fontSize="1.2rem" >{name}</Typography>
        <Typography fontWeight="bold" fontSize="1rem" color={colors.secondary}>€ {price}</Typography>
      </Box>
    </Box>
  )
}

export default Item