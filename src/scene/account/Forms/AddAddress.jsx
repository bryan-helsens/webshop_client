import { Box, Paper } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import * as yup from "yup";
import ButtonUserSettings from '../../../components/button/ButtonUserSettings';
import Header from '../../../components/Header';
import { addAddress } from '../../../services/UserService';
import { createSearchParams, useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';

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


const AddAddress = () => {
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg('');
  }, [])

  const handleFormSubmit = async (values, actions) => {
    try {

      const res = await addAddress(values);

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

      <Paper elevation={0} sx={{ padding: "20px", paddingBottom: "80px" }} >  
        <Header title="Add Address" subtitle="Add a new address to your addresses list" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
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
    </Box>
  )
}

export default AddAddress