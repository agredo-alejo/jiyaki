import React, { useState, useRef, useEffect } from 'react'
import "./updateName.scss"
import { updateDoc } from 'firebase/firestore'
import { useAuth } from '../../shared/authContext'
import { useClickOutside } from '../../shared/utils'

function UpdateName({ modalState }: any) {
    const [show, setShow] = modalState
    const { dbUser } = useAuth()
    const [inputText, setInputText] = useState("")
    const submitName = async () => {
        if (inputText == "") return
        // const newName = inputText

        await updateDoc(dbUser?.ref, {
            name: inputText.trim()
        })
        
        // setInputText("")
        setShow(false)

    }
    const closeModal = () => { setShow(false) }
    const updateNameRef = useRef<null | HTMLDivElement>(null)
    useClickOutside(updateNameRef, closeModal)


    useEffect(() => {
        setInputText(dbUser?.name)
    }, [dbUser])
    return (
        <div className={`${show ? "modal" : "hide"}`}>
            <div ref={updateNameRef} className="updateName">
                <h3>Cambiar nombre</h3>
                <input type="text" value={inputText} onChange={e => { setInputText(e.target.value) }} />
                <div className="updateNameButtons">
                    <button onClick={closeModal} >Cancelar</button>
                    <button onClick={submitName} >Guardar</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateName
