import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from '../components/User'
import Dashboard from '../scene/admin'
import Login from '../scene/auth/login'
import Register from '../scene/auth/register'
import Topbar from '../scene/global/Topbar'
import RequireAuth from '../components/RequireAuth'
import { Role } from '../_helpers/role'
import Unauthorized from '../components/Unauthorized'
import Missing from '../components/Missing'

const RouteApp = () => {
  return (
    <div className="app">
        {/*<Routes />*/}
        <main className="content">
            <Topbar />
            <Routes>
                <Route path="/" exact  element={<User />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/login" exact element={<Login />} />

                <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
                  <Route path="/admin" exact  element={<Dashboard />} />
                </Route>


                {/* catch all */}
                <Route path="/*" element={<Missing />} />
            </Routes>
        </main>
    </div>
  )
}

export default RouteApp