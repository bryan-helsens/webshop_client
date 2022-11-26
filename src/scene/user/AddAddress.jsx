import { Box } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import * as yup from "yup";
import ButtonUserSettings from '../../components/button/ButtonUserSettings';
import Header from '../../components/Header';
import { addAddress } from '../../services/UserService';
import AddressForm from './forms/AddressForm';

const options = {
  option1: "Mr.",
  option2: "Mrs.",
  option3: "None",
}

const initialValues = {
      title: options.option1.toString(),
      firstName: "",
      lastName: "",
      street: "",
      number: 0,
      country: "",
      city: "",
      zipCode: "",
      billing_address: false,
      shipping_address: false,
}

const validationScheme = [
  yup.object().shape({
          title: yup.string().required("required"),
          firstName: yup.string().required("required"),
          lastName: yup.string().required("required"),
          street: yup.string().required("required"),
          number: yup.number().required("required"),
          country: yup.string().required("required"),
          city: yup.string().required("required"),
          zipCode: yup.string().required("required"),
          billing_address: yup.boolean(),
          shipping_address: yup.boolean()
      })
]


const AddAddress = () => {
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg('');
  }, [])

  const handleFormSubmit = async (values, actions) => {
    try {

      const res = await addAddress(values);

      if (res){
        console.log(res, "test");
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

            <Box sx={{ float: 'right' }} width="100%" mt="20px">
                <ButtonUserSettings>save</ButtonUserSettings>
            </Box> 

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>

          </form>

        )}

      </Formik>
    </Box>
  )
}

export default AddAddress