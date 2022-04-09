import React, { useState, useEffect, useRef } from 'react'
import "./mood.scss"

import { ResponsiveContainer, LineChart, XAxis, Line, Tooltip, Area, AreaChart, YAxis } from 'recharts'
import { doc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../shared/authContext'
// import { Tooltip } from '@mui/material'

function Mood() {
    const { dbUser, currentUser } = useAuth()
    const [moodSelected, setMoodSelected] = useState<null| number>()
    const [graphdata, setgraphdata] = useState<any>()
    const docRef = doc(db, "users", currentUser.uid, "data", "mood")

    // const emojis = ["🤩", "😄", "😐", "🙁", "😪"]
    const emojis = [
        "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/emojis%2Fdissapointment.png?alt=media&token=0afde7c2-044d-41a1-bd44-ef1e23bfdd78",

        "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/emojis%2Fsad.png?alt=media&token=8cd3fe64-8baf-412e-aeb7-c95172a1bfda",

        "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/emojis%2Fneutral.png?alt=media&token=9ca5bb15-7d10-48d1-9cc4-95bfe221f13e",

        "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/emojis%2Fsmiling.png?alt=media&token=c265d273-7d02-4dcb-aab3-70f884960ae3",

        "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/emojis%2Fstar.png?alt=media&token=324759d7-8097-4c0d-8221-6d9ddcd21a74",





    ]

    useEffect(() => {
        
        const unSubscribe = onSnapshot(docRef, moodSnapshot=>{
            if(!moodSnapshot.exists())
            return

            setgraphdata(moodSnapshot.data()?.data)
        })

        return unSubscribe
    }, [])
    
    const changeMood = async(key: number)=>{
        if(key == moodSelected) return
        setMoodSelected(key)

        let day = new Date().getDay() - 1
        day = day < 0 ? 6 : day

        const newData = graphdata
        newData[day].qty = key

        await setDoc(docRef, {
            data: newData
        })
        // console.log("i");
        
    }

    return (<div className="mood">

        <div className="moodInput">

            <span className="moodText">
                <p>Hola {dbUser?.name?.split(" ")?.[0]}, </p>
                <p>Como te sientes el dia de hoy? </p>
            </span>
            {/* <button onClick={upload} >upload</button> */}


            <div className="emojis">
                {emojis.map((emoji: string, key: number) => (
                    <div className="emoji" key={key} onClick={() => { changeMood(key) }}>
                        {/* <span className="emoji"> */}
                        <img src={emoji} alt="" />
                        {/* </span> */}
                    </div>
                ))}
            </div>
        </div>
        <div className="moodGraph">
            {graphdata && <ResponsiveContainer width="99%" height="99%" >
                <AreaChart data={graphdata}
                margin={{ right: 20, left: 20, top: 10 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>

                    </defs>
                    <XAxis dataKey="name" />

                    {/* <Tooltip /> */}

                    <Area type="monotone" dataKey="qty" stroke="#ecc0b7" fillOpacity={0.7} fill="#ecc0b7" />
                </AreaChart>
            </ResponsiveContainer>}

        </div>

    </div>)
}

export default Mood
