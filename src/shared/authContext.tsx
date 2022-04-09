import React, { useContext, useState, useEffect } from "react"
import { auth, googleProvider, db } from "../firebase"
import { signInWithPopup, signInAnonymously } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { deleteDoc, doc } from "firebase/firestore"



const AuthContext = React.createContext<any>(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState<any>()
    const [dbUser, setdbUser] = useState()
    const [loaded, setLoaded] = useState(false)

    function loginWithGoogle() {
        if(dbUser){
            navigate("/")
            return
        }
        return signInWithPopup(auth, googleProvider)
    }
    function loginAnonymously() {
        if (dbUser) {
            navigate("/")
            return
        }
        return signInAnonymously(auth)
    }

    async function deleteUser(){
        await deleteDoc(doc(db, "users", currentUser.uid))
    }

    function logout() {
        return (() => {
            navigate("/login")
            setdbUser(undefined)
            if(currentUser.isAnonymous){
                deleteUser()
            }
            auth.signOut()
        })()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoaded(true)
        })
        return unsubscribe
    }, [])


    const value = {
        setCurrentUser,
        currentUser,
        loginWithGoogle,
        loginAnonymously,
        logout,
        dbUser,
        setdbUser
    }

    return (
        <AuthContext.Provider value={value}>
            {loaded && children}
        </AuthContext.Provider>
    )
}

