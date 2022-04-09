import React, { useState } from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { HiMenu } from "react-icons/hi";
import SettingsIcon from '@mui/icons-material/Settings';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Quotes from '../quotes/quotes';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Dynamics from '../dynamics/dynamics';

function Navbar() {

    const [showNavbar, setShowNavbar] = useState(false)
    const [showQuotes, setShowQuotes] = useState(false)
    const [showActivities, setShowActivities] = useState(false)


    return (<>
        <Dynamics modalState={[showActivities, setShowActivities]} />
        <Quotes modalState={[showQuotes, setShowQuotes]} />
  
        <nav className={`navbar ${showNavbar? "showText" : ""}`}>
            <div className="nav_topbar" onClick={() => setShowNavbar((showNavbar: boolean) => !showNavbar)}>
                <IconButton >
                    <HiMenu />
                </IconButton>
                <span className="navbar_li_text">
 
                </span>
            </div>
            <ul onClick={() => { setShowNavbar(false) }} className={`nav_ul`}>

                <li className="navbar_li">
                    <Link to="/">
                        <IconButton> <HomeIcon /> </IconButton>
                        <span className="navbar_li_text">
                            <p>Inicio</p>
                        </span>
                    </Link>
                    <span className="toolTip">Inicio</span>
                </li>

                <li className="navbar_li">
                    <Link to="/multimedia">
                        <IconButton> <PermMediaIcon /> </IconButton>
                        <span className="navbar_li_text">
                            <p>Multimedia</p>
                        </span>
                    </Link>
                    <span className="toolTip">Multimedia</span>
                </li>
                

                <li onClick={() => setShowQuotes(true)} className="navbar_li">
                    <IconButton  > <VolunteerActivismIcon /> </IconButton>
                    <span className="navbar_li_text">
                        <p>Frases</p>
                    </span>
                    <span className="toolTip">Frases</span>
                </li>

                <li onClick={() => setShowActivities(true)} className="navbar_li">
                    <IconButton  > <EmojiEventsIcon /> </IconButton>
                    <span className="navbar_li_text">
                        <p>Actividades</p>
                    </span>
                    <span className="toolTip">Actividades</span>
                </li>

                <li className="navbar_li navbar_config">
                    <Link to="/settings">
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>


                        <span className="navbar_li_text">
                            <p>Configuración</p>
                        </span>
                    </Link>
                    <span className="toolTip">Configuración</span>
                </li>



            </ul>
        </nav>
    </>)
}

export default Navbar
