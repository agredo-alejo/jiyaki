import React from 'react'
import Navbar from './navbar/navbar'
import Footer from './footer/footer'

function Layout({children}:any) {
    return (<>
        <Navbar/>
        <div className="page_nav_margin">
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    </>)
}

export default Layout
