import * as yup from "yup"

export const accountInitialValues = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    },
}

export const accountScheme = [
    yup.object().shape({
        user: yup.object().shape({
            firstName: yup.string().required("required").nullable(),
            lastName: yup.string().required("required").nullable(),
            email: yup.string().email("Invalid email").required("required").nullable(),
            phone: yup.string().required("required").nullable(),
        }),
    })
]