import React, { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { useAuth } from '../../shared/authContext'
import { db } from '../../firebase'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UpdateGoal from './updateGoals';

function DailyGoals() {
    const [showUpdateGoal, setShowUpdateGoal] = useState(false)
    const [goals, setGoals] = useState<any>([])
    const [keySelected, setKeySelected] = useState(0)
    const {dbUser} = useAuth()


    const todaysRef = doc(db, "users", dbUser.uid, "data", "today")
    useEffect(() => {
        const unSubscribe = onSnapshot(todaysRef, snapshot => {
            setGoals(snapshot.data()?.dailyGoals)
        }, e => console.error(e))


        return unSubscribe
    }, [])
    return (<>
        <UpdateGoal modalState={[showUpdateGoal, setShowUpdateGoal]} goals={goals} keySelected={keySelected} todaysRef={todaysRef} />
        
        <div className="settingGroup">
            <h4>Objetivos diarios</h4>
            {goals.map((goal: any, key: number) => (

                <div key={key} className="settingOption">
                    <p className="settingOptionTitle goalTitle">
                        {goal?.title}
                    </p>
                    <span className="settingOptionSpan">
                        <p> {goal?.dailyGoal} {goal?.unidad} </p>
                        <ChevronRightIcon
                            className="settingOptionArrow"
                            onClick={() => {
                                setShowUpdateGoal(true)
                                setKeySelected(key)
                            }}
                        />
                    </span>
                </div>
            ))}
        </div>
    </>)
}

export default DailyGoals
