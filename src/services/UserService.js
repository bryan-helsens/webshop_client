import axios from '../api/axios'

const ME_GET_URL = '/api/me'
const UPDATE_ACCOUNT_PUT_URL = '/api/update'
const ADDRESSES_GET_URL = "/api/addresses"

export const getMyInformation = async () => {
    try {
        
        const res = await axios.get(`${ME_GET_URL}`);

        if (res?.status === 200){
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const getUserAddresses = async () => {
    try {
        
        const res = await axios.get(`${ADDRESSES_GET_URL}`);

        if (res?.status === 200){
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const updateAccount = async (user) => {
    try {
        
        const res = await axios.put(`${UPDATE_ACCOUNT_PUT_URL}`,
            {user}
        );

        console.log(res);

        if (res?.status === 200){
            return res?.data;
        }

        return null;

    } catch (error) {
        console.error(error);
    }
}