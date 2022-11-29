import { Alert, AlertTitle, Box, Button, useTheme } from '@mui/material'
import { Formik } from 'formik'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import ButtonUserSettings from '../../components/button/ButtonUserSettings';
import { getMyInformation, getUserAddresses, updateAccount } from '../../services/UserService';
import { tokens } from '../../theme';
import AddressList from './AddressList';
import UserForm from './Forms/UserForm';

const accountInitialValues = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    },
}

const addressInitialValues = {
    addresses: {
        id: 0,
        title: "",
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

const accountScheme = [
    yup.object().shape({
        user: yup.object().shape({
            firstName: yup.string().required("required").nullable(),
            lastName: yup.string().required("required").nullable(),
            email: yup.string().email("Invalid email").required("required").nullable(),
            phone: yup.string().required("required").nullable(),
        }),
    })
]

const addressScheme = [
    yup.object().shape({
        addresses: yup.object().shape({
            id: yup.number().required("required"),
            title: yup.string(),
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
    })
]


const AccountForms = ({ selected, labels }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [formValues, setFormValues] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const [initialValues, setInitialValues] = useState({});
    const [validationScheme, setValidationScheme] = useState({});

    const isAccount = selected === labels[0]
    const isAddress = selected ===  labels[2]

    useEffect(() => {
        setLoading(true)

        switch (selected) {
            case "account":
                console.log("account");
                getUserData()
                setInitialValues(accountInitialValues)
                setValidationScheme(accountScheme)
                break;

            case "addresses":
                console.log("addresses");
                getAddresses()
                setInitialValues(addressInitialValues)
                setValidationScheme(addressScheme)
                setLoading(false)
                break;
        
            default:
                break;
        }


    }, [selected, isAccount, isAddress])


    const getUserData = async() => {
        const res = await getMyInformation()
        setFormValues(res);
        setLoading(false)
    }

    const getAddresses = async() => {
        const res = await getUserAddresses()
        setFormValues(res);
    }

    const updateData = async (values) => {
        try {
            const res = await updateAccount(values?.user);

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
    

    const handleFormSubmit = async (values, actions) => {
        updateData(values);
    }

  return (
    <Box>

        {loading ? (<></>) : (
            <>
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
            
                        {isAccount && (
                            <UserForm
                                values={values?.user}
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
                                    component={Link} 
                                    to="/user-settings/add-address"
                                >
                                    ADD ADDRESS
                                </Button>

                                <AddressList
                                    values={values?.addresses}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            </Box>
                        )}
                

                        <Box display="flex" justifyContent="space-between" gap="50px" mt="20px">
                            <ButtonUserSettings>save</ButtonUserSettings>
                        </Box>
        
                    </form>
                )}
            </Formik>
            </>
        )}
    </Box>
    
  )
}

export default AccountForms