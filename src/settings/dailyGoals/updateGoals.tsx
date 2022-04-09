import React, { useState, useRef } from 'react'
import { updateDoc } from 'firebase/firestore'
import { useClickOutside, regex } from '../../shared/utils'

function UpdateGoal({ modalState, goals, keySelected, todaysRef }: any) {
    const [show, setShow] = modalState
    const [input, setInput] = useState("")

    const updateGoalInfo = async () => {
        if (input === "") return


        let newGoal = parseInt(input)
        let newGoals = goals

        newGoals[keySelected].dailyGoal = Math.max(newGoal, 1)

        setShow(false)

        await updateDoc(todaysRef, {
            dailyGoals: newGoals
        })

    }



    const closeModal = () => { setShow(false) }
    const modalRef = useRef<null | HTMLDivElement>(null)
    useClickOutside(modalRef, closeModal)
    return (
        <div className={`${show ? "modal" : "hide"}`}>
            <div ref={modalRef} className="updateName">
                <h3>Objetivo Diario "{goals[keySelected]?.title}"  </h3>
                <input type="text" value={input} onChange={e => {
                    let regexInput = e.target.value.replace(regex, "")
                    setInput(regexInput)
                }} />
                <div className="updateNameButtons">
                    <button onClick={closeModal} >Cancelar</button>
                    <button onClick={updateGoalInfo} >Guardar</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateGoal
