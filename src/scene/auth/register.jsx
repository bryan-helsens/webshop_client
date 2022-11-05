import { Alert, AlertTitle, Box, Button, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import * as yup from 'yup'
import axios from '../../api/axios'

const REGISTER_URL = '/api/register'

const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
}

const userSchema = yup.object().shape({
    name: yup.string().required('required'),
    email: yup.string().email("Invalid email").required('required'),
    password: yup.string().required('Password is required').oneOf([yup.ref('password_confirmation'), null], 'Passwords must match!'),
    password_confirmation: yup.string().required('Confirmation Password is required').oneOf([yup.ref('password'), null], 'Passwords must match!')
})

const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

const Register = () => {
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const paperStyle = { padding: 20, width: 500, margin: "20px auto", backgroundColor: `${colors.primary[400]}` }

    const handleFormSubmit = async (values) => {
        try {
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify(values),
                {
                    headers: { 'Content-Type': 'application/json',},
                    withCredentials: true,
                }
            )

            if (response.status === 200 && response.data.status === "success"){
                setSuccess(true);
            }

        } catch (err) {
            setSuccess(false);

            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

  return (
    <Box textAlign="center">
        <Header title="Register" subtitle="" />

        <Paper style={paperStyle}>

            <Box sx={{ 
                visibility: errMsg || success ? "visible" : "hidden",
                marginBottom: errMsg || success ? "15px" : 0,
                height: errMsg || success ? "auto" : 0,
            }} >
                {success ? (
                    <Alert severity="success" sx={{ textAlign: 'left', fontSize: "0.9rem" }}>
                        <AlertTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Success</AlertTitle>
                        Successfully registered new user — <strong><Link href="/login" color='secondary' >Sign In</Link></strong>
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
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                            display="grid" 
                            gap="30px"
                            sx={{ 
                                "& > div": { gridColumn: "span 2"}
                            }}
                        >
                            <TextField 
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={capitalizeFirst(values.name)}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField 
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField 
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField 
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Confirm Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password_confirmation}
                                name="password_confirmation"
                                error={!!touched.password_confirmation && !!errors.password_confirmation}
                                helperText={touched.password_confirmation && errors.password_confirmation}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <Button type="submit" variant="contained" color="secondary" width="100%" sx={{ gridColumn: "span 2", fontSize: "1rem" }}>
                                Register
                            </Button>  
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="start" mt="20px">
                            <Typography variant="h5">Already Registered?</Typography>
                            <Link href="/login" variant="h5" color='secondary' >Sign In</Link>
                        </Box>
                    </form>
                )}
            </Formik>
        </Paper>        
    </Box>
  )
}

export default Register