import React from 'react'
import "./login.scss"
import { useAuth } from '../shared/authContext'
import { FaGoogle, FaUserSecret } from 'react-icons/fa'

function Login() {
    const { loginWithGoogle, loginAnonymously } = useAuth()

    return (
        <div className="loginModal">


            <div className="loginBody">
                <h1>Iniciar sesión </h1>

                <div className="loginButtons">

                    <button onClick={loginWithGoogle}>
                        <FaGoogle />
                        <p>Continuar con google</p>
                    </button>

                    <button onClick={loginAnonymously}>
                        <FaUserSecret />
                        <p>Continuar sin registrate</p>
                    </button>
                    
                </div>

            </div>
        </div>
    )
}

export default Login
