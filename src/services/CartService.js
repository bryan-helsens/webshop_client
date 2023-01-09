import axios, { axiosPrivate } from "../api/axios";

const CART_GET_URL = '/api/cart'

export const getCartItemsAPI = async (user) => {
    try {  
        const res = await axios.post(`${CART_GET_URL}`,
            user
        );

        if (res?.status === 200) {
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const addProductToCartAPI = async (product_id, user, quantity) => {
    console.log(product_id, user, quantity);

    try {  
        const res = await axiosPrivate.post(`${CART_GET_URL}/add/${product_id}`,
            {user: user}, quantity
        );

        console.log(res);

        if (res?.status === 200) {
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}



