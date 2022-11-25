import { Box, Divider, Link, Paper, Typography, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import Header from '../../components/Header'
import { tokens } from '../../theme';
import Info from '@mui/icons-material/InfoOutlined';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Home from '@mui/icons-material/Home';
import Invoice from '@mui/icons-material/RequestQuote';
import { useState } from 'react';
import { useEffect } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';

const AddressList = ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [mainAddress, setMainAddress] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteID, setDeleteID] = useState(null)
    
    useEffect(() => {
        const homeAddress = values?.filter(address => { return address?.pivot?.billing_address === 1 });
        setMainAddress(homeAddress);

        values?.splice(homeAddress?.id, 1)

    },[values])


    const deleteAddress = () => {
        console.log(deleteID);
        console.log("Delete Address with id ", deleteID);
    }


  return (
    <Box>
        <Box mb="5%" width="100%">
            <Header title="" subtitle="Your Address"  />
            {
                mainAddress?.map((item) => (
                    <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }} key={item?.id}>
                        <Box display="inline-block">
                            <Typography>{item?.title}. {item?.firstName} {item?.lastName}</Typography>
                            <Typography>{item?.street} {item?.number}</Typography>
                            <Typography>{item?.zipcode} {item?.city}, {item?.country}</Typography>
                        </Box>

                        <Box  display="inline-block" sx={{ float: "right"}} width="50%">
                            {item?.pivot?.shipping_address ? (
                                <Typography display="flex" justifyContent="end">
                                    Current Shipping Address
                                    <Info color="secondary" sx={{ ml: "2%"}} />
                                </Typography>
                            ) : (<></>)}

                            {item?.pivot?.billing_address ? (
                                <Typography display="flex" justifyContent="end">
                                    Current Billing Address
                                    <Info color="secondary" sx={{ ml: "2%"}} />
                                </Typography>
                            ) : (<></>)}
                        </Box>
                    

                        <Divider sx={{ p: "0.5%" }} />

                        <Box sx={{ display: 'flex', alignContent: 'center', padding: "10px 0", color: colors.redAccent[500], "& > [disabled]": { color: "grey", cursor: "default", textDecoration: "none"} }}>
                            <Link href={'/user-settings/addresses/' + item?.id} display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}} ><Edit /> Edit</Link>
                            <Link aria-label="delete" onClick={() => setConfirmOpen(true)} id={item.id} display="flex" alignItems="flex-end" color="secondary" sx={{pr: "2%", cursor: "pointer"}}><Delete /> Delete</Link>
                            <ConfirmDialog
                                title="Delete Post?"
                                open={confirmOpen}
                                setOpen={setConfirmOpen}
                                onConfirm={() => deleteAddress(item?.id)}
                            >
                                Are you sure you want to delete this post?
                            </ConfirmDialog>


                            {item?.pivot?.shipping_address ? (
                                <Link disabled display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Home /> Shipping Address</Link>
                            ) : (
                                <Link href="#" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Home /> Set as Shipping Address</Link>
                            )}
                  
                            {item?.pivot?.billing_address ? (
                                <Link disabled display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Invoice /> Billing Address</Link>
                            ) : (
                                <Link href="#" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Invoice /> Set as Billing Address</Link>
                            )}
                        </Box>
                    </Paper>
                ))       
            }
        </Box>

        <Box>
            <Header title="" subtitle="Other Addresses" />

            {
                values && values?.map((item) => (
                    <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }} key={item?.id}>
                        <Box display="inline-block">
                            <Typography>{item?.title}. {item?.firstName} {item?.lastName}</Typography>
                            <Typography>{item?.street} {item?.number}</Typography>
                            <Typography>{item?.zipcode} {item?.city}, {item?.country}</Typography>
                        </Box>

                        <Box  display="inline-block" sx={{ float: "right"}} width="50%">
                            {item?.pivot?.shipping_address ? (
                                <Typography display="flex" justifyContent="end">
                                    Current Shipping Address
                                    <Info color="secondary" sx={{ ml: "2%"}} />
                                </Typography>
                            ) : (<></>)}

                            {item?.pivot?.billing_address ? (
                                <Typography display="flex" justifyContent="end">
                                    Current Billing Address
                                    <Info color="secondary" sx={{ ml: "2%"}} />
                                </Typography>
                            ) : (<></>)}
                        </Box>
                    

                        <Divider sx={{ p: "0.5%" }} />

                        <Box sx={{ display: 'flex', alignContent: 'center', padding: "10px 0", color: colors.redAccent[500], "& > [disabled]": { color: "grey", cursor: "default", textDecoration: "none"} }}>
                            <Link href={'/user-settings/addresses/' + item?.id} display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}} ><Edit /> Edit</Link>
                            <Link onClick={() => {
                                setConfirmOpen(true);
                                setDeleteID(item?.id);
                                }} display="flex" alignItems="flex-end" color="secondary" sx={{pr: "2%"}}><Delete /> Delete</Link>

                            {item?.pivot?.shipping_address ? (
                                <Link disabled display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Home /> Shipping Address</Link>
                            ) : (
                                <Link href="#" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Home /> Set as Shipping Address</Link>
                            )}
                  
                            {item?.pivot?.billing_address ? (
                                <Link disabled display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Invoice /> Billing Address</Link>
                            ) : (
                                <Link href="#" display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}}><Invoice /> Set as Billing Address</Link>
                            )}
                        </Box>
                    </Paper>
                ))         
            }


            <ConfirmDialog
                title="Delete Post?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={deleteAddress}
            >
                Are you sure you want to delete this post?
            </ConfirmDialog>


            {/* <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }}>
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
            </Paper> */}
        </Box>
    
    </Box>
  )
}

export default AddressList