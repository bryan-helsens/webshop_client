import { Box, Typography, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../../theme';

const Footer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

  return (
    <Box
        marginTop="70px" 
        padding="40px 0"
        backgroundColor={colors.primary[900]}
    >
        <Box
            width="80%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap="30px"
            columnGap="clamp(20px, 30px, 40px)"
        >
            <Box width="clamp(20%, 30%, 40%)">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb="30px"
                    color={colors.redAccent[500]}
                >
                    ECOMMER
                </Typography>
                <Box>
                    This website is only used for educational purposes.
                </Box>
            </Box>

            <Box>
                <Typography variant="h4" fontWeight="bold" mb="30px">
                    Information
                </Typography>
                <Typography mb="15px">About us</Typography>
                <Typography mb="15px">Contact US</Typography>
                <Typography mb="15px">Terms & Conditions</Typography>
                <Typography mb="15px">Privacy Policy</Typography>
            </Box>

            <Box>
                <Typography variant="h4" fontWeight="bold" mb="30px">
                    Customer Care
                </Typography>
                <Typography mb="15px">Help Center</Typography>
                <Typography mb="15px">Track Your Order</Typography>
                <Typography mb="15px">Corporate & Bulk Purchasing</Typography>
                <Typography mb="15px">Returns & Refunds</Typography>
            </Box>

            <Box width="clamp(20%, 25%, 30%)">
                <Typography variant="h4" fontWeight="bold" mb="30px">
                    Contact Us
                </Typography>
                <Typography mb="15px">
                    Rijselstraat 5, 8200 Brugge, België
                </Typography>
                <Typography mb="15px" sx={{ wordWrap: "break-word" }}>
                    Email: bryanhelsens@hotmail.com
                </Typography>
                <Typography mb="15px">(+32) 492 66 90 91</Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default Footer