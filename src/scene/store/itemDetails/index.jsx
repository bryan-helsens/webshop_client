import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Tab, Tabs, Typography, useTheme } from '@mui/material';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tokens } from '../../../theme';
import { addToCart } from '../../../redux/cartSlice';
import Item from '../../../components/Item';

const ItemDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch()
  const { itemID } = useParams()
  const [value, setValue] = useState("description")
  const [count, setCount] = useState(1)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getItem = async () => {
    const items = await fetch('http://localhost:3000/assets/strapi-mock-data/strapi-item-inputs.json')
    const itemsJSON = await items.json()
    setItem(itemsJSON.data["api::item.item"][itemID])
  }

  const getItems = async () => {
    const items = await fetch('http://localhost:3000/assets/strapi-mock-data/strapi-item-inputs.json')
    const itemsJSON = await items.json()
    setItems(Object.values(itemsJSON.data["api::item.item"]))
  }

  useEffect(() => {
    getItem()
    getItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemID])

  console.log(item);

  return (
    <Box
      width="80%"
      m="80px auto"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        columnGap="40px"
      >
        {/* Images */}
        <Box flex="1 1 40%" mb="40px">
          <img 
            alt={item?.name}
            width="100%"
            height="100%"
            src={`/assets/strapi-images/${itemID}.jpeg`}
            style={{ objectFit: "contain" }}
           /> 
        </Box>

        {/* Actions */}
        <Box flex="1 1 40%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          {/* COUNT AND BUTTON */}
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography>${item?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>{item?.longDescription}</Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box display="flex" alignItems="center" border={`1.5px solid ${colors.primary[300]}`} mr="20px" p="2px 5px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={colors.grey[100]} sx={{ p: "0 5px" }} fontSize="1rem">{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              sx={{ 
                backgroundColor: "#000 !important",
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px'
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count }}))}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <Box>{item?.longDescription}</Box>
        )}
        {value === "reviews" && (
          <Box>Reviews</Box>
        )}
      </Box>

      {/* Related Items */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0,4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item}/>
          ))}
        </Box>
      </Box>    
    </Box>
  )
}

export default ItemDetails