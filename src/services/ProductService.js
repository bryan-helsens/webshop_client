import axios from '../api/axios'

const PRODUCTS_GET_URL = '/api/products'

export const getProducts = async (page, category, search) => {
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