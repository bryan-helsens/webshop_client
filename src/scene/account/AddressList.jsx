import { Alert, AlertTitle, Box, Divider, Link, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
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
import { useSearchParams } from 'react-router-dom';
import { deleteAddressByID } from '../../services/UserService';


const AddressList = ({ values, addressRef }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [searchParam, setSearchParam] = useSearchParams()
    const [selectedAddress, setSelectedAddress] = useState({})
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [mainAddress, setMainAddress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [addressValues, setAddressValues] = useState([])
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deleteID, setDeleteID] = useState(null)

    
    useEffect(() => {
        setLoading(true)
        setSuccess(false)

        const isAdded = searchParam.get('success') === 'true';

        if (isAdded){
            setSuccess(true)
            setSuccessMsg("Successfully added a new address")
 
        }else{
            setSuccess(false)
            setErrMsg("Something went wrong")
        }

        setAddresses()

    },[values])


    const setAddresses = () => {
        if (values?.id !== 0){
            setMainAddress(values?.filter((address) =>  address?.pivot?.billing_address === 1 ));
            setAddressValues(values?.filter((address) =>  address?.pivot?.billing_address !== 1 ))
            setLoading(false)

            searchParam.delete('success');
            setSearchParam(searchParam);
        }  
    }

    const deleteAddress = async () => {
        setSuccess(false)

        try {
            const res = await deleteAddressByID(deleteID);
            console.log(res);

            if (res){
                const indexOfObject = values.findIndex(object => {
                    return object.id === deleteID;
                });
                values.splice(indexOfObject, 1);

                setSuccess(true);
                setSuccessMsg(res.message);
                setAddresses()

                addressRef.current.scrollIntoView({behavior: 'smooth'});
            }else{
                setSuccess(false);
                setErrMsg(res.response.data["message"])
            }

 
            
        } catch (error) {
            setSuccess(false);
     
            console.log(error);

            if (!error?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(error.response.data["message"])
            }
        }
    }

  return (
    <Box >
        {loading ? (
            <Box>Waiting ...</Box>
        ) : (
        <>
        <Box mb="5%" width="100%" >

            <Box sx={{ 
                visibility:  success ? "visible" : "hidden",
                marginBottom:  success ? "15px" : 0,
                height: success ? "auto" : 0,
            }} >
                {success ? (
                    <Alert severity="success" sx={{ textAlign: 'left', fontSize: "0.9rem", backgroundColor: colors.greenAccent[800], }}>
                        <AlertTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Success</AlertTitle>
                        {successMsg}
                    </Alert>
                ) : (
                    <Alert severity="error" sx={{ textAlign: 'left', fontSize: "0.9rem", backgroundColor: colors.redAccent[800], }}>
                        <AlertTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Error</AlertTitle>
                        {errMsg}
                    </Alert>
                )}
            </Box>

            <Header title="" subtitle="Your Address"  />
            {
                mainAddress?.map((item) => (
                    <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }} key={item?.id}>
                        <Typography variant='h4' fontWeight="bold" mb="5px">Address from {item?.firstName} {item?.lastName}</Typography>
                        <p>{item?.id}</p>
                        <Box display="inline-block">
                            <Typography>{item?.title !== null ? item.title : ''} {item?.firstName} {item?.lastName}</Typography>
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
                            <Link href={'/user-settings/address/' + item?.id} display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}} ><Edit /> Edit</Link>
                            <Link onClick={() => {
                                setConfirmOpen(true);
                                setSelectedAddress(item);
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
        </Box>

        <Box>
            <Header title="" subtitle="Other Addresses" />

            {
                addressValues?.id !== 0  ? addressValues?.map((item) => (
                    <Paper elevation={5} sx={{ p: "2% 3%", m: "2% 2%" }} key={item?.id}>
                        <Typography variant='h4' fontWeight="bold" mb="5px">Address from {item?.firstName} {item?.lastName}</Typography>
                        <p>{item?.id}</p>
                        <Box display="inline-block">
                            <Typography>{item?.title !== null ? item.title : ''} {item?.firstName} {item?.lastName}</Typography>
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
                            <Link href={'/user-settings/address/' + item?.id} display="flex" alignItems="flex-end" color="secondary" sx={{ pr: "2%"}} ><Edit /> Edit</Link>
                            <Link onClick={() => {
                                setConfirmOpen(true);
                                setSelectedAddress(item);
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
                )) : <></>        
            }


            <ConfirmDialog
                title="Delete Address?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={deleteAddress}
            >
                Address : {<br />} {selectedAddress?.street} {selectedAddress?.number} at {selectedAddress?.city} {<br />} {<br />}

                Are you sure you want to delete this address?
            </ConfirmDialog>

        </Box>
        </>

        )}
    
    </Box>
    
  )
}

export default AddressList