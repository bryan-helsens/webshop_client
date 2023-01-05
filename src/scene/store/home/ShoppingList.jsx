import { Box, LinearProgress, Pagination, Tab, Tabs, Typography, useMediaQuery, IconButton, InputBase } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Item from '../../../components/Item';
import { getProductsAPI } from '../../../services/ProductService';
import SearchIcon from '@mui/icons-material/Search'
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';

const ShoppingList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const [category, setCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const breakPoint = useMediaQuery('(min-width:600px)')
    const tablet = useMediaQuery('(min-width:900px)')

    const productsRef = useRef(null);

    const handleChange = (e, newValue) => {
        setCategory(newValue);
        setPage(1)
    }

    const handleChangePagination = (e, value) => {
        setPage(value)
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const getProducts = async () => {
        const res = await getProductsAPI(page, category, search)
        const products = res.data
        console.log(res);
        setTotal(res.meta.last_page)

        setProducts(products)
    }

    useEffect(() => {
        setLoading(true)
        getProducts()

        productsRef.current.scrollIntoView({behavior: 'smooth'});
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, category, search])

  return (
    <Box width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center" ref={productsRef}>
            Our Featured <b>Products</b>
        </Typography>

        <Box 
            sx={{ display: tablet ? "flex" : "block" }}
            alignItems="center"
            justifyContent="space-between" 
            margin="30px"
        >
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={category}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
                sx={{
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="NEW ARRIVALS" value="new" />
                <Tab label="BEST SELLERS" value="best" />
                <Tab label="TOP RATED" value="top" />
            </Tabs>

            {/* Search Bar */}
            <Box 
                sx={{ 
                    display: tablet ? "flex" : "block",
                    margin: tablet ? "" : "10px auto",
                    width: tablet ? "40%" : "100%"
                }}
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1, width: "90%" }} placeholder="Search" value={search} onChange={handleChangeSearch}/>
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
        </Box>
        

        {loading ? 
        (
            <LinearProgress color="secondary" />
        ) : (
            <Box>
                <Box
                    margin="0 auto"
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, 300px)"
                    justifyContent="space-around"
                    rowGap="20px"
                    columnGap="1.33%"
                >
                    {category === "all" &&
                        products.map((item) => (
                            <Item item={item} key={`${item.name}-${item.id}`} />
                        ))}
                    {category === "new" &&
                        products.map((item) => (
                            <Item item={item} key={`${item.name}-${item.id}`} />
                        ))}
                    {category === "best" &&
                        products.map((item) => (
                            <Item item={item} key={`${item.name}-${item.id}`} />
                        ))}
                    {category === "top" &&
                        products.map((item) => (
                            <Item item={item} key={`${item.name}-${item.id}`} />
                        ))}
                </Box>

                <Box display="flex" justifyContent="center" pt="5%">
                    <Pagination count={total} page={page} onChange={handleChangePagination} />
                </Box>
            </Box>
        )}
    </Box>

  )
}

export default ShoppingList