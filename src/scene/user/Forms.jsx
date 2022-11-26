import { Alert, AlertTitle, Box, Button, Paper, Typography, useTheme } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from "yup";
import UserForm from './forms/UserForm';
import ButtonUserSettings from '../../components/button/ButtonUserSettings';
import { useState } from 'react';
import AddressList from './AddressList';
import { getMyInformation, getUserAddresses, updateAccount } from '../../services/UserService';
import { tokens } from '../../theme';
import AddressFromDialog from '../../components/AddressFormDialog';
import AddressForm from './forms/AddressForm';
import { Link } from 'react-router-dom';

const options = {
    option1: "Mr.",
    option2: "Mrs.",
    option3: "None",
}

const initialValues = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    addresses: {
        title: options.option1.toString(),
        firstName: "",
        lastName: "",
        street: "",
        number: 0,
        country: "",
        city: "",
        zipCode: "",
        billing_address: false,
    }
}

const checkoutScheme = [
    yup.object().shape({
        user: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            email: yup.string().email("Invalid email").required("required"),
            phone: yup.string().required("required"),
        }),
        addresses: yup.object().shape({
            title: yup.string().required("required"),
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            street: yup.string().required("required"),
            number: yup.number().integer().required("required"),
            country: yup.string().required("required"),
            city: yup.string().required("required"),
            zipCode: yup.string().required("required"),
            billing_address: yup.boolean()
        })
    })
]

const Forms = ({ selected, labels }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [formValues, setFormValues] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [open, setOpen] = useState(false)


    const isAccount = selected === "account"
    const isAddress = selected === "address"

    const handleOpen = () =>{
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const getUserData = async() => {
        const res = await getMyInformation()
        console.log(res.user);
        setFormValues(res);
    }

    const getAddresses = async() => {
        const res = await getUserAddresses()
        console.log(res.addresses);
        setFormValues(res);
    }

    useEffect(() => {
        setLoading(true)

        if (isAccount) {
            getUserData()
        }

        if (isAddress){
            getAddresses()
        }


        setLoading(false)
    }, [selected])


    

    const handleFormSubmit = async (values, actions) => {

        if (isAccount){
            console.log("account");

            updateData(values);
        }

        console.log(values, "values");
        console.log(actions, "actions");
    }

    const addAddress = async (address) => {
        console.log(address);
    }


    const updateData = async (values) => {

        console.log(values, "data send");
        try {
            const res = await updateAccount(values.user);
            console.log(res);

            if (res){
                setSuccess(true);
                setSuccessMsg(res.message);
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

            <Typography variant="h2" mb="20px" fontWeight="bold">{selected.toUpperCase()}</Typography>

            <Box sx={{ 
                visibility: errMsg || success ? "visible" : "hidden",
                marginBottom: errMsg || success ? "15px" : 0,
                height: errMsg || success ? "auto" : 0,
            }} >
                {success ? (
                    <Alert severity="success" sx={{ textAlign: 'left', fontSize: "0.9rem" }}>
                        <AlertTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Success</AlertTitle>
                        {successMsg}
                    </Alert>
                ) : (
                    <Alert severity="error" sx={{ textAlign: 'left', fontSize: "0.9rem" }}>
                        <AlertTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Error</AlertTitle>
                        {errMsg}
                    </Alert>
                )}
            </Box>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={formValues || initialValues}
                validationSchema={checkoutScheme[selected]}
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

                        {isAccount && (
                            <UserForm
                                values={values.user}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                            />
                        )}

                        {isAddress && (
                            <Box>
                                <Button
                                    sx={{
                                        minWidth: '100px',
                                        backgroundColor: colors.redAccent[500],
                                        fontSize: "0.9rem",
                                        float: 'right',
                                        "&:hover": {
                                            backgroundColor: colors.primary[100],
                                            color: colors.primary[900],
                                        }
                                    }}
                                    variant="contained"
                                    component={Link} to="/user-settings/add-address"
                                    //onClick={handleOpen}
                                >ADD ADDRESS</Button>

                                <AddressList
                                    values={values.addresses}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />

                                <AddressFromDialog
                                    title="Add Address"
                                    open={open}
                                    setOpen={setOpen}
                                    onConfirm={addAddress}
                                >
                                    <AddressForm
                                        values={values.addresses}
                                        errors={errors}
                                        touched={touched}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                    />
                                </AddressFromDialog>
                            </Box>
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