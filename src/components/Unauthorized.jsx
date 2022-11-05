import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Header from './Header';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
  return (
    <Box m="20px">
        <Header title="Unauthorized" subtitle="You do not have access to the requested page!" />

        <Link onClick={goBack}>Go Back</Link>
    </Box>
  )
}

export default Unauthorized