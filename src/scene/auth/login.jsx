import { Alert, AlertTitle, Box, Button, Link, Paper, Typography, useTheme } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import { login } from '../../services/AuthService'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../redux/authSlice'
import { loginInitialValues, loginSchema } from '../../_helpers/form_validation/authValidation'
import LoginForm from '../forms/LoginForm';
import { updateCartDB } from '../../services/CartService'

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const cart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        setErrMsg('');
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const paperStyle = { padding: 20, width: 500, margin: "20px auto", backgroundColor: `${colors.primary[400]}` }

    const updateCartOnServer = async(user) => {
        if (cart.length !== 0){
            const res = await updateCartDB(user, cart);
        }
    }


    const handleFormSubmit = async (values) => {
        try {

            const res = await login(values.email, values.password)
            if (res?.status === 200){
                setSuccess(true);
                dispatch(setCredentials({ ...res?.data }));

                const user = res?.data?.user;
                updateCartOnServer(user);

                navigate(from, { replace: true });
            }else{
                setSuccess(false);
                setError(true);
                setErrMsg('Login Failed');
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
    <Box textAlign="center">
        <Header title="Login" subtitle="" />

        <Paper style={paperStyle}>

            <Box sx={{ 
                visibility: error || success ? "visible" : "hidden",
                marginBottom: error || success ? "15px" : 0,
                height: error || success ? "auto" : 0,
            }} >
                {success ? (
                    <Alert severity="success" sx={{ textAlign: 'left', fontSize: "0.9rem" }}>
                        <AlertTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Success</AlertTitle>
                        Successfully logged in
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
                initialValues={loginInitialValues}
                validationSchema={loginSchema[0]}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>

                        <LoginForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}     
                        />
                        
                        <Button type="submit" variant="contained" color="secondary" width="100%" sx={{ gridColumn: "span 2", fontSize: "1rem", mt: "20px", width: "100%" }}>
                            Login
                        </Button>  
        
                        <Box display="flex" flexDirection="column" alignItems="start" mt="20px">
                            <Typography variant="h5">Need an Account?</Typography>
                            <Link href="/register" variant="h5" color='secondary' >Sign up</Link>
                        </Box>
                    </form>
                )}
            </Formik>
        </Paper> 
    </Box>
  )
}

export default Login