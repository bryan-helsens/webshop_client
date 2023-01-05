import { Alert, AlertTitle, Box, Button, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import { registerInitialValues, registerSchema } from '../../_helpers/form_validation/authValidation'
import { register } from '../../services/AuthServices';
import RegisterForm from '../form/RegisterForm';

const Register = () => {
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const paperStyle = { padding: 20, width: 500, margin: "20px auto", backgroundColor: `${colors.primary[400]}` }

    const handleFormSubmit = async (values, action) => {
        try {     
            const res = await register(values.name, values.email, values.password, values.password_confirmation);
            console.log(res);

            if (res){
                setSuccess(true);
            }

        } catch (error) {
            setSuccess(false);

            if (!error?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed');
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
                initialValues={registerInitialValues}
                validationSchema={registerSchema[0]}
                enableReinitialize
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>

                        <RegisterForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                        />
                       
                        <Button type="submit" variant="contained" color="secondary" sx={{ gridColumn: "span 2", fontSize: "1rem", mt: "20px", width: "100%" }}>
                            Register
                        </Button> 

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