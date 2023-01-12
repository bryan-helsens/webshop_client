import { axiosPrivate } from '../api/axios'

const PROFILE_GET_POST_URL = '/api/profile'
const ADDRESSES_GET_URL = "/api/addresses"
const ADDRESS_ADD_POST_URL = "/api/add-address"
const ADDRESS_EDIT_PUT_URL = "/api/edit-address/"
const ADDRESS_DELETE_URL = "/api/delete-address/"
const ADDRESS_GET_BY_ID_URL = "/api/address/"
const CHANGE_TYPE_ADDRESS_URL = "/api/address/"

export const getMyProfile = async () => {
    try {
        const res = await axiosPrivate.get(`${PROFILE_GET_POST_URL}`);

        if (res?.status === 200){
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const updateProfile = async (customer) => {
    try {
        const res = await axiosPrivate.post(`${PROFILE_GET_POST_URL}`,
            {customer}
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

export const getUserAddresses = async () => {
    try {
        const res = await axiosPrivate.get(`${ADDRESSES_GET_URL}`);

        if (res?.status === 200){
            return res?.data;
        }

        return null;
    } catch (error) {
        console.error(error);
    }
}

export const getAddressByID = async (id) => {
    try {
        
        const res = await axiosPrivate.get(`${ADDRESS_GET_BY_ID_URL}${id}`);

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
        const res = await axiosPrivate.post(`${ADDRESS_ADD_POST_URL}`,
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

export const updateAddress = async (id, address) => {
    try {
        const res = await axiosPrivate.put(`${ADDRESS_EDIT_PUT_URL}${id}`,
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

export const switchTypeAddress = async (id, type) => {
    try {
        const res = await axiosPrivate.put(`${CHANGE_TYPE_ADDRESS_URL}${type}/${id}`,
        );
        console.log(res);

        if (res?.status === 200){
            return true;
        }

        return null;

    } catch (error) {
        console.error(error);
    }
}

export const deleteAddressByID = async (id) => {
    try {
        const res = await axiosPrivate.delete(`${ADDRESS_DELETE_URL}${id}`);
        console.log(res, "res");
        if (res?.status === 200){
            return res?.data;
        }

        return null;

    } catch (error) {
        console.error(error, "boe");
    }
}

