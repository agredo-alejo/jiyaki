import React from 'react'
import "./message.scss"
import { useAuth } from '../authContext'
import { getTime } from "../utils"


function Message({ msg }: any) {
    const { dbUser } = useAuth()

    let time = msg?.timestamp?.toDate()
    const msgClass = dbUser?.uid == msg.uid ? "sended" : ""
    // const msgClass = Math.random() > .5? "sended" : ""


    return (
        <div className={`message ${msgClass}`}>
            <p className="msgName"> {msg.name} </p>
            {/* <p className="msgName"> Alejandro </p> */}
            {/* <img src={msg.photoURL} alt="msgPhoto" /> */}
            <div className="flex">

                <p> {msg.text} </p>
                {/* <p>test</p> */}
                <span className="chat_timestamp"> {getTime(time)} </span>
                {/* <span className="chat_timestamp"> 5:30 p.m. </span> */}
            </div>
        </div>
    )
}

export default Message
