import { TextField } from "@mui/material";
import { useField } from "formik";

const capitalizeFirst = str => {
    str = str.replaceAll('_', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const MyTextField = ({ columnWidth, ...props }) => {
    const [field, meta] = useField(props);

    const formattedError = () => 
    Boolean(
        meta.error && meta.touched
    )
    const formattedHelper = () => 
        meta.error && meta.touched ? meta.error : ""

    return (
        <TextField
            {...field} 
            value={field?.value}
            helperText={formattedHelper()} 
            error={formattedError()} 
            color="secondary"
            label={capitalizeFirst(field?.name)}
            type={props?.type}
            sx={{ 
                gridColumn: `span ${columnWidth}`,
            }} 
        />
    )
}