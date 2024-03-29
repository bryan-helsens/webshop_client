import * as yup from "yup"

export const profileInitialValues = {
    customer: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    },
}

export const profileScheme = [
    yup.object().shape({
        customer: yup.object().shape({
            first_name: yup.string().required("required").nullable(),
            last_name: yup.string().required("required").nullable(),
            email: yup.string().email("Invalid email").required("required").nullable(),
            phone: yup.string().required("required").nullable(),
        }),
    })
]