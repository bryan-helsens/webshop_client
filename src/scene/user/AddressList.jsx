import { Box, Divider, Link, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme';
import Info from '@mui/icons-material/InfoOutlined';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Home from '@mui/icons-material/Home';
import Invoice from '@mui/icons-material/RequestQuote';



const AddressList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box>
        <Box mb="5%" width="100%">
            <Header title="" subtitle="Your Address"  />
            <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }}>
                <Box  display="inline-block">
                    <Typography>Dhr. Bryan Helsens</Typography>
                    <Typography>Rijselstraat 24</Typography>
                    <Typography>8000 Brugge, Belgie</Typography>
                </Box>

                <Box  display="inline-block" sx={{ float: "right"}} width="50%">
                    <Typography display="flex" justifyContent="end">
                        Current Shipping Address
                        <Info color="secondary" sx={{ ml: "2%"}} />
                    </Typography>

                    <Typography display="flex" justifyContent="end">
                        Current Billing Address
                        <Info color="secondary" sx={{ ml: "2%"}} />
                    </Typography>
                </Box>
             

                <Divider sx={{ p: "0.5%" }} />

                <Box sx={{ display: 'flex', alignContent: 'center', padding: "10px 0", color: colors.redAccent[500], "& > [disabled]": { color: "grey", cursor: "default", textDecoration: "none"} }}>
                    <Link component="button" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Edit /> Edit</Link>
                    <Link component="button" display="flex" alignItems="flex-end" color="secondary" sx={{pr: "2%"}}><Delete /> Delete</Link>
                    <Link component="button" disabled display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Home /> Shipping Address</Link>
                    <Link component="button" disabled display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Invoice /> Billing Address</Link>
                </Box>
            </Paper>
        </Box>

        <Box>
            <Header title="" subtitle="Other Addresses" />
            <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }}>
                <Box  display="inline-block">
                    <Typography>Dhr. Bryan Helsens</Typography>
                    <Typography>Rijselstraat 24</Typography>
                    <Typography>8000 Brugge, Belgie</Typography>
                </Box>

                <Box  display="inline-block" sx={{ float: "right"}} width="50%">
                </Box>
             

                <Divider sx={{ p: "0.5%" }} />

                <Box sx={{ display: 'flex', alignContent: 'center', padding: "10px 0", color: colors.redAccent[500] }}>
                    <Link component="button" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Edit /> Edit</Link>
                    <Link component="button" display="flex" alignItems="flex-end" color="secondary" sx={{pr: "2%"}}><Delete /> Delete</Link>
                    <Link component="button" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Home /> Set as Shipping Address</Link>
                    <Link component="button" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Invoice /> Set as Billing Address</Link>
                </Box>
            </Paper>
            <Paper elevation={5} sx={{ p: "2% 5%", m: "2% 2%" }}>
                <Typography>Dhr. Bryan Helsens</Typography>
                <Typography>Rijselstraat 24</Typography>
                <Typography>8000 Brugge, Belgie</Typography>
            </Paper>
            <Paper elevation={5} sx={{ p: "2% 5%", m: "2% 2%" }}>
                <Typography>Dhr. Bryan Helsens</Typography>
                <Typography>Rijselstraat 24</Typography>
                <Typography>8000 Brugge, Belgie</Typography>
            </Paper>
            <Paper elevation={5} sx={{ p: "2% 5%",  m: "2% 2%" }}>
                <Typography>Dhr. Bryan Helsens</Typography>
                <Typography>Rijselstraat 24</Typography>
                <Typography>8000 Brugge, Belgie</Typography>
            </Paper>
        </Box>
    
    </Box>
  )
}

export default AddressList