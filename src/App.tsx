import React, { useEffect } from 'react'
import "./app.scss"
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import ProtectedRoutes from './protectedRoutes';
import { doc, setDoc, onSnapshot, getDoc, serverTimestamp, DocumentReference, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

import Home from './home/home';

import Settings from './settings/settings';

import Multimedia from './multimedia/multimedia';
import { useAuth } from './shared/authContext';
import Login from './login/login';

const todaysData = [
  {
    currentCount: 0,
    dailyGoal: 10000,
    title: "Pasos",
    name: "walk",
    increment: 500,
    unidad: "",
  },
  {
    currentCount: 0,
    dailyGoal: 2000,
    title: "Hidratacion",
    name: "water",
    increment: 240,
    unidad: "ml",
  },
  {
    currentCount: 0,
    dailyGoal: 8,
    title: "Descanso",
    name: "sleep",
    increment: 0.5,
    unidad: "h",
  },
  {
    currentCount: 0,
    dailyGoal: 120,
    title: "Meditacion",
    name: "meditation",
    increment: 20,
    unidad: "mn",
  },
  {
    currentCount: 0,
    dailyGoal: 5,
    title: "Conexiones",
    name: "socialize",
    increment: 1,
    unidad: "",
  },
  {
    currentCount: 0,
    dailyGoal: 150,
    title: "Lectura",
    name: "read",
    increment: 20,
    unidad: "pag",
  },
]

function App() {
  const { setdbUser, currentUser, } = useAuth()
  const navigate = useNavigate()
  const location: any = useLocation()


  const setUserDoc = async (userRef: DocumentReference<DocumentData>) => {
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) return



    await setDoc(userRef, {
      name: currentUser.displayName || "",
      email: currentUser.email || "Anonimo",
      photoURL: currentUser.photoURL,
      lastSeen: serverTimestamp(),
      // isAnonymous: currentUser.isAnonymous
    })

    const todaysRef = doc(db, "users", currentUser.uid, "data", "today")
    
    await setDoc(todaysRef, {
      dailyGoals: todaysData
    })

    const recordCategories = ["meditation", "mood", "read", "sleep", "socialize", "walk", "water"]
    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
    const weekRecord: any = []
    for (let i = 0; i < days.length; i++) {
      // const element = array[i];
      weekRecord[i] = {
        name: days[i],
        qty: 0
      }

    }

    const setRecord = async (ref: any, ) => {
      await setDoc(ref, {
        data: weekRecord
      })
    }
    for (let i = 0; i < recordCategories.length; i++) {
      const docRef = doc(db, "users", currentUser.uid, "data", recordCategories[i])
      setRecord(docRef)
    }

  }


  useEffect(() => {
    if (!currentUser) return

    // console.log(currentUser);


    const userRef = doc(db, "users", currentUser.uid)

    setUserDoc(userRef).catch(console.error)


    // Get real time data from user
    const unSubscribe = onSnapshot(userRef, userSnapShot => {
      setdbUser({
        ...userSnapShot.data(),
        uid: currentUser.uid,
        ref: userRef
      })
    }, error => console.error(error))

    // Redirect to dynamic route
    const route = location?.state?.from ? location.state.from : "/"
    navigate(route)

    return unSubscribe
  }, [currentUser])

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />} >

          <Route path="/" element={<Home />} />

          <Route path="/multimedia" element={<Multimedia />} />


          <Route path="/settings" element={<Settings />} />

        </Route>


        <Route path="/*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  )
}

export default App
