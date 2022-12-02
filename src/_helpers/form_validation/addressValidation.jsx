import * as yup from 'yup'

export const addressInitialValues = {
    addresses: {
        id: 0,
        title: "",
        firstName: "",
        lastName: "",
        street: "",
        number: 0,
        country: "",
        city: "",
        zipcode: "",
        billing_address: false,
    }
}

export const addressInitialValuesEditAndAdd = {
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    number: 0,
    country: "",
    city: "",
    zipcode: "",
    billing_address: false,

}

export const addressScheme = [
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
            zipcode: yup.string().required("required"),
            billing_address: yup.boolean(),
            shipping_address: yup.boolean()
        })
    })
]

export const addressSchemeEditAndAdd = [
    yup.object().shape({
        title: yup.string(),
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        street: yup.string().required("required"),
        number: yup.number().required("required"),
        country: yup.string().required("required"),
        city: yup.string().required("required"),
        zipcode: yup.string().required("required"),
        billing_address: yup.boolean(),
        shipping_address: yup.boolean()
    })
]