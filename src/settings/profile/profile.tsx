import React, { useState } from 'react'
import { useAuth } from '../../shared/authContext'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ProfilePhoto from './profilePhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import UpdateName from './updateName';

function Profile() {
    const {dbUser, logout} = useAuth()
    const [showUpdateName, setShowUpdateName] = useState(false)
    return (<>
        <UpdateName modalState={[showUpdateName, setShowUpdateName]} />
        <div className="settingGroup">

            <div className="settingOption">
                <p className="settingOptionTitle">
                    Email
                     </p>
                <span className="settingOptionSpan">
                    <p> {dbUser?.email} </p>
                    <LogoutIcon onClick={logout}
                        className="logoutIcon" />
                </span>
            </div>


            <div className="settingOption">
                <p className="settingOptionTitle">Foto</p>

                <div className="profilePhoto flex">
                    <p>Agrega una foto para personalizar tu cuenta</p>
                    <ProfilePhoto />
                </div>
            </div>

            <div className="settingOption">
                <p className="settingOptionTitle">
                    Nombre
                    </p>
                <span className="settingOptionSpan">
                    <p> {dbUser?.name} </p>
                    <ChevronRightIcon
                        className="settingOptionArrow"
                        onClick={() => { setShowUpdateName(true) }}
                    />
                </span>
            </div>



        </div>
    </>)
}

export default Profile
