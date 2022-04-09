import React, { useState, useRef, useEffect } from 'react'
import "./activityRecord.scss"
import { useClickOutside } from '../../shared/utils'
import { ResponsiveContainer, LineChart, XAxis, Line, Tooltip } from 'recharts'
import { icons } from './activityCard'
import { activities } from './activities'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../shared/authContext'

function ActivityRecord({ modalState, info, index }: any) {
    const {currentUser} = useAuth()
    const [showModal, setShowModal] = modalState
    const modalRef = useRef<null | HTMLDivElement>(null)
    const [dayShifted, setDayShifted] = useState(0)
    const [currentCount, setCurrentCount] = useState<null|number>(40)

    const [graphdata, setgraphdata] = useState<any>()



    const subQty = () => {
        let newData = graphdata
        let sub = graphdata[dayShifted].qty - info[index]?.increment

        newData[dayShifted].qty = Math.max(0, sub)
        setgraphdata(newData)

        setCurrentCount(newData[dayShifted].qty)
    }
    const addQty = () => {
        let newData = graphdata
        newData[dayShifted].qty = info[index]?.increment + graphdata[dayShifted].qty

        setgraphdata( newData )
        
        setCurrentCount( newData[dayShifted].qty )
    }


    const getData = async()=>{
        if (info.length === 0) return
        let day = new Date().getDay() - 1
        day = day < 0 ? 6 : day
        setDayShifted(day)
        const habitRef = doc(db, "users", currentUser.uid, "data", info[index]?.name)
        const habit = await getDoc(habitRef)
        const habitData = habit.data()
     
        setgraphdata(habitData?.data)

    }
    useEffect(() => {
  
        getData()
    }, [])
    useEffect(() => {
        if(!graphdata || graphdata.length == 0) return
        setCurrentCount(graphdata[dayShifted].qty)
        
    }, [graphdata])
    useEffect(() => {
        getData()
    }, [index])
    const update = async () => {
        if (!currentCount) return
        
        const todayRef = doc(db, "users", currentUser.uid, "data", "today")
        const habitRef = doc(db, "users", currentUser.uid, "data", info[index]?.name)

        if (!graphdata) return

        const updatedToday = info
        updatedToday[index].currentCount = currentCount
        // }
        await setDoc(todayRef, {
            dailyGoals: updatedToday
        })
        await setDoc(habitRef, {
            data: graphdata
        })

    }


    useClickOutside(modalRef, () =>{
        setShowModal(false)
        update()
    })
    return (<div className={`${showModal ? "modal" : "hide"}`}>
        <div ref={modalRef} className="activityRecord">
            <div className="recordGraph">

                <ResponsiveContainer width="99%" aspect={2}>
                    <LineChart
                        data={graphdata}
                        margin={{ left: 20, right: 10, top: 10 }}
                    >

                        <XAxis hide={false} dataKey="name" />
                        <Tooltip />

                        <Line type="monotone" dataKey="qty" stroke="rgb(74,90,103)" strokeWidth={5} dot={{ stroke: "rgb(74,90,103)", strokeWidth: 1 }} />

                    </LineChart>
                </ResponsiveContainer>

            </div>
            <div className="recordInput">

                <span className="flex">

                    <div className="bigIcon" >
                        {icons[info[index]?.name as activities || 'default']}
                        
                    </div>

                    <p className="stepsAmt"> {currentCount} {info[index]?.unidad} / {info[index]?.dailyGoal} {info[index]?.unidad} </p>
                </span>

                <span>
                    <button onClick={subQty}>-{info[index]?.increment}</button>
                    <button onClick={addQty}>+{info[index]?.increment}</button>
                </span>

            </div>
        </div>

    </div>)
}

export default ActivityRecord
