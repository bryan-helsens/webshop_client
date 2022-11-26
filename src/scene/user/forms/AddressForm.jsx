import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Field, getIn, useField } from 'formik';
import React from 'react'
import ButtonUserSettings from '../../../components/button/ButtonUserSettings';
import { tokens } from '../../../theme';


const MyRadio = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    // field => value, onChange, ...
    // meta => error data

    return (
        <FormControlLabel {...field} control={<Radio />} label={label} />
    )
}

const MyCheckbox = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <FormControlLabel
            {...field}
            control={<Checkbox />}
            label={label}
        />
    )
}

const MyTextField = ({ columnWidth, ...props }) => {
    const [field, meta] = useField(props);

    //const formattedName = (field) => `${field}`
    const formattedError = () => 
    Boolean(
        meta.error && meta.touched
    )
    const formattedHelper = () => 
        meta.error && meta.touched ? meta.error : ""

    return (
        <TextField 
            {...field} 
            value={field.value}
            helperText={formattedHelper()} 
            error={formattedError()} 
            color="secondary"
            label={field.name}
            sx={{ 
                gridColumn: `span ${columnWidth}`,
            }} 
        />
    )
}

const AddressForm = ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)')

  return (
    <Box
        display="grid"
        gap="15px"
        mt="10px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
        }}
    >
        <Box        
            sx={{ 
                gridColumn: "span 4",
                "& .MuiRadio-root.Mui-checked": {
                    color: "#4cceac",
                }
            }}
        >
            <FormLabel component="legend">Salutation</FormLabel>
            <MyRadio name={'title'} type="radio" value="Mr." label="Mr." />
            <MyRadio name={'title'} type="radio" value="Mrs." label="Mrs." />
            <MyRadio name={'title'} type="radio" value="" label="None" />
        </Box>


        <MyTextField
            name={'firstName'}
            type="input"  
            columnWidth={2}
        />

        <MyTextField
            name={'lastName'}
            type="input"  
            columnWidth={2}
        />

        <MyTextField
            name={'street'}
            type="input"  
            columnWidth={3}
        />

        <MyTextField
            name={'number'}
            type="input"  
            columnWidth={1}
        />

        <MyTextField
            name={'city'}
            type="input"  
            columnWidth={2}
        />


        <MyTextField
            name={'country'}
            type="input"  
            columnWidth={2}
        />


        <MyTextField
            name={'zipCode'}
            type="input"  
            columnWidth={1}
        />


        <Box
            sx={{
                gridColumn: "span 4",
                display: "grid",
                "& .MuiCheckbox-root.Mui-checked": {
                    color: "#4cceac",
                }
            }}
        >
            <MyCheckbox
                name={'billing_address'} type="checkbox" label="Set As Billing Address" 
            />

            <MyCheckbox
                name={'shipping_address'} type="checkbox" label="Set As Shipping Address" 
            />
        </Box>
 
    </Box>
  )
}

export default AddressForm