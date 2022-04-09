import React, { useState, useEffect } from 'react'
import "./chatFooter.scss"
import { useAuth } from '../authContext'
import Picker, { IEmojiData } from "emoji-picker-react"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { IoSend } from "react-icons/io5";
import { db } from '../../firebase';

function ChatFooter({ scrollChat, openChatroom }: any) {
    const { dbUser, currentUser } = useAuth()
    const [messageInput, setMessageInput] = useState("")
    const [showEmojis, setShowEmojis] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState<null | IEmojiData>(null)
    const toggleShowEmojis = () => { setShowEmojis((showEmojis: boolean) => !showEmojis) }
    const messagesRef = collection(db, "chatroomMessages")


    const newMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (messageInput == "") return
        if (currentUser.isAnonymous) {
            setMessageInput("")
            setShowEmojis(false)
            return
        }

        const newMessageDoc = {
            timestamp: serverTimestamp(),
            text: messageInput,
            uid: dbUser?.uid,
            photoURL: dbUser?.photoURL,
            name: dbUser?.name
        }
        setMessageInput("")
        setShowEmojis(false)

        await addDoc(messagesRef, newMessageDoc)
        scrollChat()

    }
    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        setChosenEmoji(emojiObject)
    }

    useEffect(() => {
        if (!chosenEmoji) return
        setMessageInput(messageInput + chosenEmoji.emoji)
    }, [chosenEmoji])
    useEffect(() => {
        if(openChatroom) return
        
        setShowEmojis(false)
    }, [openChatroom])

    return (
        <div className="chatFooter">
            <div className={`${showEmojis ? "emojiPicker" : "hide"}`}>

                <Picker onEmojiClick={onEmojiClick} />
            </div>
            <form onSubmit={newMessageHandler}>
                <div className="chatInput">

                    <InsertEmoticonIcon onClick={toggleShowEmojis} />
                    <input type="text" value={messageInput} onChange={e => { setMessageInput(e.target.value) }} />
                </div>
                <button className="chatSendButton" type="submit"> <IoSend /> </button>
            </form>
        </div>
    )
}

export default ChatFooter
