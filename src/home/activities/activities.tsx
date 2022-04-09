import React, { useState, useEffect } from 'react'
import "./activities.scss"
import ActivityCard from './activityCard'
import ActivityRecord from './activityRecord'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../shared/authContext'

export type activities = "meditation" | "read" | "sleep" | "socialize" | "walk" | "water" | "default"
function Activities() {
    const [showRecord, setShowRecord] = useState(false)
    const [activityIndex, setActivityIndex] = useState<any>(0)
    const {currentUser} = useAuth()
    const [cards, setCards] = useState<any>([])


    useEffect(() => {
        const todayRef = doc(db, "users", currentUser.uid, "data", "today")
        const unSubscribe = onSnapshot(todayRef, todaysSnapshot => {
            if(!todaysSnapshot.exists()) return
            setCards(todaysSnapshot.data()?.dailyGoals)
            
        }, e => console.error(e))
        return unSubscribe
    }, [])


    return (<>


        {cards.length !== 0 && <ActivityRecord
            info={cards}
            index={activityIndex}
            modalState={[showRecord, setShowRecord]}

        />}

        <div className="activities">
            {cards.length !== 0 && cards.map((cardInfo: any, key: number) => (
                <ActivityCard
                    key={key}
                    cardInfo={cardInfo}
                    onClick={() => {
                        setActivityIndex(key)
                        setShowRecord(true)
                    }}
                />
            ))}

        </div>
    </>)
}

export default Activities

