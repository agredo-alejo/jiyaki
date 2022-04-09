import React, { useEffect, useState, useRef } from 'react'
import "./chatroom.scss"
import Message from "./message";
import { collection, onSnapshot, query, orderBy, limit, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase';
import ForumIcon from '@mui/icons-material/Forum';
import { useClickOutside } from '../utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatFooter from './chatFooter';

function Chatroom() {
    const [visibleMessages, setVisibleMessages] = useState<DocumentData>([])
    const messagesRef = collection(db, "chatroomMessages")
    const [openChatroom, setOpenChatroom] = useState(false)
    const scrollRef = useRef<null | HTMLSpanElement>(null)
    const chatRef = useRef<null | HTMLDivElement>(null)
    const scrollChat = () => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"), limit(15))
        const unSubscribe = onSnapshot(messagesQuery, messagesSnapShot => {

            const latestMessages: DocumentData = []
            messagesSnapShot.forEach(chatMessage => {
                latestMessages.push({ ...chatMessage.data(), id: chatMessage.id })
            });
            setVisibleMessages(latestMessages.reverse())
        })


        scrollChat()
        return unSubscribe
    }, [])

    useEffect(() => {
        if(!openChatroom) return

        scrollChat()
    }, [openChatroom])


    useClickOutside(chatRef, () => { setOpenChatroom(false) })

    return (<>
        <div className={`${openChatroom ? "hide" : "chatroomButton"}`} onClick={() => {
            setOpenChatroom(true)
            scrollChat()
        }} >
            <ForumIcon />
        </div>
        <div ref={chatRef} className={`${openChatroom ? "chat" : "hide"}`}>

            <div className="chatHeader">
                <KeyboardArrowDownIcon onClick={() => {
                    setOpenChatroom(false)
                    
                }} />
            </div>

            <div className="chatBody">
                {visibleMessages.map((msg: any, key: number) => (
                    <Message key={key} msg={msg} />
                ))}
                <span ref={scrollRef}></span>

            </div>

            <ChatFooter scrollChat={scrollChat} openChatroom={openChatroom} />
        </div>

    </>)
}

export default Chatroom
