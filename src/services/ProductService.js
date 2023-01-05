import axios from '../api/axios'

const PRODUCTS_GET_URL = '/api/products'
const PRODUCT_BY_ID_GET_URL = '/api/product'

export const getProductsAPI = async (page, category, search) => {
    try {  
        const res = await axios.get(`${PRODUCTS_GET_URL}?page=${page}&category_slug=${category}&search=${search}`);

        if (res?.status === 200) {
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const getRelatedProducts = async (category) => {
    try {  
        const res = await axios.get(`${PRODUCTS_GET_URL}?category_slug=${category}`);

        if (res?.status === 200) {
            return res?.data.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const getproductByID = async (id) => {
    try {  
        const res = await axios.get(`${PRODUCT_BY_ID_GET_URL}/${id}`);

        if (res?.status === 200) {
            return res?.data?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}