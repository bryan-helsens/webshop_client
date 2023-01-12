import { Box, Paper } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ButtonUserSettings from '../../../components/button/ButtonUserSettings';
import Header from '../../../components/Header';
import { addAddress } from '../../../services/UserService';
import { createSearchParams, useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import { addressInitialValuesEditAndAdd, addressSchemeEditAndAdd } from '../../../_helpers/form_validation/addressValidation';



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


        navigate({pathname: '/profile/settings/addresses',  search: `?${createSearchParams({
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
          initialValues={addressInitialValuesEditAndAdd}
          validationSchema={addressSchemeEditAndAdd[0]}
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