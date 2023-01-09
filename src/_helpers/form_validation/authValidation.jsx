import * as yup from 'yup'

export const registerInitialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
}

export const loginInitialValues = {
    email: "boe3008@hotmail.com",
    password: "Boe3008!",
}

export const registerSchema = [
    yup.object().shape({
        name: yup.string().required('required'),
        email: yup.string().email("Invalid email").required('required'),
        password: yup.string().required('Password is required').oneOf([yup.ref('password_confirmation'), null], 'Passwords must match!'),
        password_confirmation: yup.string().required('Confirmation Password is required').oneOf([yup.ref('password'), null], 'Passwords must match!')
    })
]

export const loginSchema = [
    yup.object().shape({
        email: yup.string().email("Invalid email").required('required'),
        password: yup.string().required('Password is required'),
    })
]