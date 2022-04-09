import React, { useState, useRef, useEffect } from 'react'
import "./dynamics.scss"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useClickOutside, randomIndex } from '../utils';

function Dynamics({ modalState }: any) {
    const [showModal, setShowModal] = modalState
    // non-dynamic data - no need for database
    const [dynamics, setDynamics] = useState([
        {
            title: "Tarro de agradecimiento",
            content: "Llena un tarro con papelitos en los cuales hayas escrito temas o aspectos por los cuales sientas agradecimiento. cada día revisa uno de los papelitos al azar y dedica un momento de agradecimiento por el motivo que estaba escrito. En el trascurso del día repite el agradecimiento hasta finalizar el día. Con el objetivo concientizarse de las cosas por las cuales se de debe sentir afortunado.",
        },
        {
            title: "Las alarmas de la autoestima",
            content: "Fija una serie de alarmas a la hora que consideres conveniente. Estas alarmas vendrán acompañadas de un mensaje de motivación que habrás escrito para recordarte lo valioso que es.",
        },
        {
            title: "Respiración guiada",
            content: "Todas las mañanas, después de despertarse realiza la siguiente actividad de respiración: Primero se acustate boca arriba con manos y piernas abiertas simulando una estrella y comenzara a respirar profundo mientras cierras los ojos. Luego inhalara aire por la nariz y exhalara por la boca contando 7 segundos, lo repetirás 10 veces. Después de esto, inhala aire hasta tener los pulmones llenos, sosten 30 segundos y exhala, repite este proceso 10 veces más. Para finalizar, inhalara aire y exhalara hasta que tus pulmones esten completamente vacíos y sosten 2 segundos, esto antes de volver a inhalar, y repite 10 veces más.",
        },
        {
            title: "Playlist de la felicidad",
            content: "Crea una playlist de las canciones que más te hagan sentir feliz, con animos y alegre. Dedica almenos 30 minutos para escuchar esta playlist, y si lo prefieres canta y baila.",
        },

    ])
    const [random, setRandom] = useState(0)
    const pickRandomDynamic = () => {
        let randomDynamic = randomIndex(dynamics)
        while (randomDynamic == random) {
            randomDynamic = randomIndex(dynamics)
        }
        setRandom(randomDynamic)
    }
    useEffect(() => {
        pickRandomDynamic()
    }, [])
    const modalRef = useRef<null | HTMLDivElement>(null)
    useClickOutside(modalRef, () => setShowModal(false))
    return (
        <div className={`${showModal ? "modal" : "hide"}`}>

            <div ref={modalRef} className="dynamics">
                <div className="dynamicsHeader">
                    <EmojiEventsIcon />
                    <h3> {dynamics[random].title} </h3>
                </div>
                <div className="dynamicsBody">
                    <p> {dynamics[random].content} </p>
                    <span>
                        <button onClick={pickRandomDynamic}>Hecho</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Dynamics
