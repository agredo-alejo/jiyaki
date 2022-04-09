import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './shared/authContext';
import Layout from './shared/layout';


function ProtectedRoutes() {
    const { currentUser, dbUser } = useAuth()

    return currentUser ?
        <Layout>
            {dbUser && <Outlet />}
        </Layout> :

        <Navigate to="/login" state={{ from: useLocation() }} />
}

export default ProtectedRoutes
