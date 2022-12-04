import { Alert, AlertTitle, Box, Button, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import * as yup from 'yup'
import { login } from '../../services/AuthService'
import { AuthState } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

const initialValues = {
    email: "boe2@hotmail.com",
    password: "Test3008!",
}

const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required('required'),
    password: yup.string().required('Password is required'),
})

const Login = () => {
    const { setAuth } = AuthState()

    const userRef = useRef()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus()
        setErrMsg('');
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const paperStyle = { padding: 20, width: 500, margin: "20px auto", backgroundColor: `${colors.primary[400]}` }

    const handleFormSubmit = async (values) => {
        try {

            const res = await login(values.email, values.password)
            if (res){
                const user = res?.data?.user
                const access_token = res?.data?.access_token
                const roles = res?.data?.roles
                setAuth({ user, access_token, roles })

                setSuccess(true);
                navigate(from, { replace: true });
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
                visibility: errMsg || success ? "visible" : "hidden",
                marginBottom: errMsg || success ? "15px" : 0,
                height: errMsg || success ? "auto" : 0,
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
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                ref={userRef}
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

                            <Button type="submit" variant="contained" color="secondary" width="100%" sx={{ gridColumn: "span 2", fontSize: "1rem" }}>
                                Login
                            </Button>  
                        </Box>

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