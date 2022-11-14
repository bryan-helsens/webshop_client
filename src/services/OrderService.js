import axios from "../api/axios"


const CREATE_ORDER_URL = '/api/place-order'

export const placeOrder = async (data) => {
    try {
        const res = await axios.post(CREATE_ORDER_URL, 
            {data},
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true,
            }
        )

        if (res?.status === 200) {
            return res;
        }

    } catch (err) {
        console.error(err);
    }
}