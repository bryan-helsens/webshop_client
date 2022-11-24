import { Box, Button, Paper, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from "yup";
import UserForm from './forms/UserForm';
import ButtonUserSettings from '../../components/button/ButtonUserSettings';
import { useState } from 'react';
import AddressList from './AddressList';
import { getMyInformation, updateAccount } from '../../services/UserService';

const initialValues = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
}

const checkoutScheme = [
    yup.object().shape({
        user: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            email: yup.string().email("Invalid email").required("required"),
            phone: yup.string().required("required"),
        }),
        test: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            country: yup.string().required("required"),
            street1: yup.string().required("required"),
            street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipCode: yup.string().required("required"),
      })
    })
]

const Forms = ({ selected, labels }) => {
    const [formValues, setFormValues] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    const isAccount = selected === "account"

 /*    useEffect(() => {
        setFormValues(data);
    }, []) */

    const getUserData = async() => {
        const res = await getMyInformation()
        console.log(res.user);
        setFormValues(res);
    }

    useEffect(() => {
        setLoading(true)
        getUserData()

        setLoading(false)
    }, [])


    

    const handleFormSubmit = async (values, actions) => {

        if (isAccount){
            console.log("account");

            updateData(values);
        }

        console.log(values, "values");
        console.log(actions, "actions");
    }


    const updateData = async (values) => {

        console.log(values, "data send");
        try {
            const res = await updateAccount(values.user);
            console.log(res);

            if (res){
                setSuccess(true);
            }
        } catch (error) {
            setSuccess(false);

            if (!error?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(error.response.data["message"])
            }
        }
    }

  return (
    <Box width="80%">
        <Paper elevation={0} sx={{ padding: "30px" }}>
            <Typography variant="h3" mb="20px">General Info</Typography>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={formValues || initialValues}
                validationSchema={checkoutScheme.user}
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

                        {selected === labels[0] && (
                            <UserForm
                                values={values.user}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        )}

                        {selected === labels[2] && (
                            <AddressList
                                values={values.address}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        )}


                    
                        {selected === labels[0] && (
                            <Box display="flex" justifyContent="space-between" gap="50px" mt="20px">
                                <ButtonUserSettings>save</ButtonUserSettings>
                            </Box>
                        )}
                 
                    </form>
                )}
            </Formik>

        </Paper>
     
    </Box>
  )
}

export default Forms