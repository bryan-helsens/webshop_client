import axios from '../api/axios'

const ME_GET_URL = '/api/me'
const UPDATE_ACCOUNT_PUT_URL = '/api/update'
const ADDRESSES_GET_URL = "/api/addresses"
const ADDRESS_ADD_POST_URL = "/api/add-address"
const ADDRESS_DELETE_URL = "/api/delete-address/"

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

        if (res?.status === 200){
            return res?.data;
        }

        return null;

    } catch (error) {
        console.error(error);
    }
}

export const addAddress = async (address) => {
    try {
        const res = await axios.post(`${ADDRESS_ADD_POST_URL}`,
            {address}
        );

        if (res?.status === 200){
            return res?.data;
        }

        return null;

    } catch (error) {
        console.error(error);
    }
}

export const deleteAddressByID = async (id) => {
    try {
        const res = await axios.delete(`${ADDRESS_DELETE_URL}${id}`);
        console.log(res, "res");
        if (res?.status === 200){
            return res?.data;
        }

        return null;

    } catch (error) {
        console.error(error, "boe");
    }
}

