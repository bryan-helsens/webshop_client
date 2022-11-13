import React, { useState } from 'react'
import { Box, Button, Step, StepButton, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from "yup";
import Shipping from './Shipping';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js'
import CartTable from './CartTable';
import BtnCheckout from '../../../components/button/ButtonChekout';
import BtnBack from '../../../components/button/ButtonBack';

const stripePromise = loadStripe(
  process.env.REACT_APP_KEY
)

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
}

const checkoutScheme = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    phoneNumber: yup.string().required("required"),
  }),
]

const steps = ['Cart', 'Billing', 'Payment', 'Done'];

const Checkout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0
  const isSecondStep = activeStep === 1
  const isthirdStep = activeStep === 2

  const handleFormSubmit = async (values, actions) => {

    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      })
    }

  /*   if (isSecondStep){
      makePayment(values)
    } */

    actions.setTouched({});
  }

/*   const makePayment = async (values) => {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(' '),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })) 
    }

    const response = await fetch()
  } */

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        {steps.map((label, i) => (
          <Step key={label}
          
            sx={{
              "& .Mui-active, & .Mui-completed": { color: `${colors.redAccent[500]} !important`}
            }}
          > 
            <StepButton color="inherit" onClick={handleStep(i)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>

        {isFirstStep ? (
          <CartTable />
        ) : (
          <></>
        )}

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutScheme[activeStep - 1]}
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
              {isSecondStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}

              {isthirdStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box display="flex" justifyContent="space-between" gap="50px">
                {isthirdStep || isSecondStep ? (
                  <BtnBack step={activeStep} setActiveStep={setActiveStep}  />
                ) : (
                  <></>
                )}
           
                <BtnCheckout step={activeStep} setActiveStep={setActiveStep} />
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Checkout