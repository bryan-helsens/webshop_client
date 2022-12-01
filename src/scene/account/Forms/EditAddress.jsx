import { Box, Paper, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import * as yup from "yup"
import ButtonUserSettings from '../../../components/button/ButtonUserSettings'
import Header from '../../../components/Header'
import { getAddressByID, updateAddress } from '../../../services/UserService'
import AddressForm from './AddressForm'

// add id to data????

const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    number: 0,
    country: "",
    city: "",
    zipcode: "",
    billing_address: false,
    shipping_address: false,
}

const validationScheme = [
    yup.object().shape({
        title: yup.string(),
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        street: yup.string().required("required"),
        number: yup.number().required("required"),
        country: yup.string().required("required"),
        city: yup.string().required("required"),
        zipcode: yup.string().required("required"),
        billing_address: yup.boolean(),
        shipping_address: yup.boolean()
    })
]


const EditAddress = () => {
    const params = useParams();
    
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true)

        getAddressData();

        setLoading(false);
    }, [])

    const getAddressData = async () => {
        const id = params.id;

        const res = await getAddressByID(id)

        res.addresses.shipping_address === 0 ? res.addresses.shipping_address = false : res.addresses.shipping_address = true
        res.addresses.billing_address === 0 ? res.addresses.billing_address = false : res.addresses.billing_address = true

        setAddress(res.addresses);
        setLoading(false)

    }

    const handleFormSubmit = async (values, actions) => {
        try {
            const id = params.id;
            const res = await updateAddress(id, values);
            console.log(res);
      
            if (res){
              setSuccess(true);
      
      
              navigate({pathname: '/account/settings/addresses',  search: `?${createSearchParams({
                    success: true,
                    message: res.message,
                })}` 
              });
            }
            
        } catch (err) {
            setSuccess(false);
        
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(err.response.data["message"])
            }
        }
    }
    

  return (
    <Box p="50px">
        {loading ? (
            <Typography>Waiting ...</Typography>
        ) : (

            <Paper elevation={0} sx={{ padding: "20px", paddingBottom: "80px" }} >  
                <Header title="Edit Address" subtitle="Edit your address" />

                <Formik
                onSubmit={handleFormSubmit}
                initialValues={address || initialValues}
                validationSchema={validationScheme[0]}
                enableReinitialize
                >

                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (


                    <form onSubmit={handleSubmit}>
                    
                    <AddressForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                    />

                    <Box sx={{ float: 'right' }} width="100%" > 
                        <ButtonUserSettings>save</ButtonUserSettings>
                    </Box> 

                    </form>

                )}
                

                </Formik>
            </Paper>

        )}
    </Box>
  )
}

export default EditAddress