import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Box, IconButton, Tab, Tabs, Typography, useTheme, LinearProgress } from '@mui/material';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tokens } from '../../../theme';
import Item from '../../../components/Item';
import { getproductByID, getRelatedProducts } from '../../../services/ProductService';
import { IMAGE_STORAGE_URL } from '../../../api/URL';
import BtnAddToCart from '../../../components/button/ButtonAddToCart';

const ItemDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { productID } = useParams()
  const [value, setValue] = useState("description")
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getProductInfo = async () => {
    const product = await getproductByID(productID)

    setProduct(product)
    getRelatedProductsAPI(product?.category ? product?.category : 'top');

  }

  const getRelatedProductsAPI = async (category) => {
    const res = await getRelatedProducts(category)
    setRelatedProducts(res)
  }

  useEffect(() => {
    setLoading(true)
    getProductInfo();

    setLoading(false)
  }, [productID])

  return (
    <Box
      width="80%"
      m="80px auto"
    >
    {loading ? (
      <LinearProgress color="secondary" />
    ) : (
      <Box>
        <Box
          display="flex"
          flexWrap="wrap"
          columnGap="40px"
        >
          {/* Images */}
          <Box flex="1 1 40%" mb="20px">
            <img 
              alt={product?.name}
              width="100%"
              height="100%"
              src={`${IMAGE_STORAGE_URL}${product?.image_url}`}
              style={{ objectFit: "contain" }}
            /> 
          </Box>

          {/* Actions */}
          <Box flex="1 1 40%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Box>Home/Item</Box>
            </Box>
            

            {/* COUNT AND BUTTON */}
            <Box m="65px 0 25px 0">
            <Box>
                <Box display="flex" justifyContent="end">
                  <FavoriteBorderOutlinedIcon />
                  <Typography sx={{ ml: "5px" }}></Typography>
                </Box>
              </Box>

              <Typography variant="h1" mb="5px" fontWeight="bold">{product?.name}</Typography>
              <Typography variant='h3'>€ {product?.price?.replace('.', ',')}</Typography>
              <Typography sx={{ mt: '20px' }} variant='h5'>{product?.short_description}</Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between" minHeight="50px">
              <Box display="flex" alignItems="center" border={`1.5px solid ${colors.primary[300]}`} mr="20px" p="2px 5px" borderRadius="5%">
                <IconButton onClick={() => setQty(Math.max(qty - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography color={colors.grey[100]} sx={{ p: "0 5px" }} fontSize="1rem">{qty}</Typography>
                <IconButton onClick={() => { 
                    if (qty <= product?.max_qty) {
                      setQty(qty + 1);
                    }
                 }}>
                  <AddIcon />
                </IconButton>
              </Box>

              <BtnAddToCart quantity={qty} product={product} size="big"/>
            </Box>
            
            <Box mt="20px">
              <Typography variant='h5'>Availability: 
                <Typography variant='h5' sx={{ 
                  color: product?.max_qty > 0 ? "green" : "red"
                }}>
                  {product?.max_qty > 0 ? `In Stock (${product.max_qty} available)` : "Out Of Stock"}
                </Typography>
              </Typography>
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
            <Typography variant="h5">{product?.description}</Typography>
          )}
          {value === "reviews" && (
            <Typography variant="h5">{product?.reviews === undefined ? "No reviews" : product?.reviews}</Typography>
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
            {relatedProducts.slice(0,4).map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item}/>
            ))}
          </Box>
        </Box> 
      </Box>   
    )}
  </Box>
    
  )
}

export default ItemDetails