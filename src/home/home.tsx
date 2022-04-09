import React from 'react'
import "./home.scss"
import { useAuth } from '../shared/authContext'
import Chatroom from '../shared/chatroom/chatroom'
import Activities from './activities/activities'
import Mood from './mood/mood';


function Home() {
    const { currentUser } = useAuth()


    return (
        <div className="homePage">

            <div className={`${currentUser.isAnonymous ? "hide" : "chatroom"}`}>
                <Chatroom />
            </div>



            <Mood />
            <Activities />


        </div>
    )
}


export default Home
