import { axiosPrivate } from "../api/axios";

const CART_GET_URL = '/api/cart'
const CART_ADD_URL = '/api/cart/add/'
const CART_REMOVE_URL = '/api/cart/remove/'
const CART_UPDATE_QTY_URL = '/api/cart/update-quantity/'

export const getCartItemsAPI = async (user) => {
    try {  
        const res = await axiosPrivate.post(`${CART_GET_URL}`,
            {user}
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
        const res = await axiosPrivate.post(`${CART_ADD_URL}${product_id}`,
            {user, quantity}
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

export const removeProductToCartAPI = async (product_id, user) => {
    try {  
        const res = await axiosPrivate.post(`${CART_REMOVE_URL}${product_id}`,
            {user}
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

export const updateQuantityAPI = async (product_id, user, quantity) => {
    try {  
        const res = await axiosPrivate.post(`${CART_UPDATE_QTY_URL}${product_id}`,
            {user, quantity}
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

