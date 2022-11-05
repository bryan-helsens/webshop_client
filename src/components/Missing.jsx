import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Missing = () => {
  return (
    <Box m="20px">
        <Header title="You Lost?" subtitle="Page Not Found!" />

        <Link to="/">Go to our Homepage</Link>
    </Box>
  )
}

export default Missing