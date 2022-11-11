import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import User from '../components/User'
import Dashboard from '../scene/admin'
import Login from '../scene/auth/login'
import Register from '../scene/auth/register'
import Topbar from '../scene/global/Topbar'
import RequireAuth from '../components/RequireAuth'
import { Role } from '../_helpers/role'
import Unauthorized from '../components/Unauthorized'
import Missing from '../components/Missing'
import Sidebar from '../scene/global/Sidebar'
import Home from '../scene/store/home'
import CartMenu from '../scene/global/CartMenu'
import Footer from '../scene/global/Footer'
import ItemDetails from '../scene/store/itemDetails'
import Checkout from '../scene/store/checkout'
import Confirmation from '../scene/store/checkout/confirmation'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const RouteApp = () => {
  return (
    <div className="app">
      <BrowserRouter>
        {/*<Routes />*/}
        {/*    <Sidebar /> */}
        <main className="content">
            <Topbar/>
            <ScrollToTop />
            <Routes>
                <Route path="/" exact  element={<Home />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/login" exact element={<Login />} />

                <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
                  <Route path="/admin" exact  element={<Dashboard />} />
                </Route>

                <Route path="/product/:itemID" element={<ItemDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<Confirmation />} />


                {/* catch all */}
               {/*  <Route path="/*" element={<Missing />} /> */}
            </Routes>

            <CartMenu />
            <Footer />
        </main>
      </BrowserRouter>
    </div>
  )
}

export default RouteApp