import * as yup from 'yup'

export const loginInitialValues = {
    email: "",
    password: "",
}

export const loginSchema = [
    yup.object().shape({
        email: yup.string().email("Invalid email").required('required'),
        password: yup.string().required('Password is required'),
    })
]