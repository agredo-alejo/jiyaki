import React, { useState, useEffect, useRef } from 'react'
import "./quotes.scss"
import { FaQuoteLeft } from "react-icons/fa"
import { randomIndex, useClickOutside } from '../utils'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

function Quotes({modalState}:any) {
    const [showQuote, setShowQuote] = modalState
    const [quotes, setQuotes] = useState([
        "No permitas que las opiniones ajenas silencien tu voz interior. Y, lo que es más importante, ten el valor de hacer lo que te dicte tu corazón y tu intuición. De algún modo, sabes en lo que realmente quieres convertirte. No se puede elegir sabiamente una vida a menos que se atreva uno a escucharse a sí mismo, a su propio yo, en cada momento de la vida.",
        "Podemos orientarnos hacia la defensa, la seguridad o el miedo. Pero, en el lado opuesto, está la opción de crecimiento. Elegir el crecimiento en lugar del miedo, significa avanzar hacia la autorrealización.",
        "Muchos de nosotros, la mayor parte del tiempo no nos escuchamos, sino que escuchamos las voces introyectadas del sistema, la autoridad o la tradición. Ahora detente, piensa, y visualiza que es lo que tu yo interior desea. Encuentra tu propia identidad.",
        "Tu mente siempre te recuerda lo malo, lo difícil, lo negativo. Recuérdale tú a ella tu grandeza, tu pasión y tu fortaleza. Cree en ti.",
        "Si no tienes un sueño, está bien, no es necesario soñar, solo sé feliz; aun si la causa de esta felicidad sean las cosas más banales y pequeñas de la vida, tu solo sigue disfrutandolas.",
        "Nunca es mala suerte una situación, son simples situaciones de la vida que deben ocurrir para aprender y seguir avanzando hacia el futuro anhelado.",
        "Eres capaz de muchas cosas, ahora puede que parezca complicado, pero tú eres capaz de salir adelante. No te rindas.",
        "Recuerda que no estás solo, siempre va a haber alguien acompañándote simplemente tienes que expandir tu visión y tú corazón.",
        "La vida es un privilegio y aunque no siempre sea fácil no quiere decir que siempre sea dura. Aprende a valorar esos pequeños momentos felices pero también aprende a enfrentar las dificultades y no te rindas ante ellas.",
        "Constantemente estamos buscando la salida fácil a los problemas y tal vez ese sea el problema, buscar la salida fácil no siempre es la solución.",
        "La montaña rusa en la que estamos montados no tiene fin y por más miedo que tengamos no nos podemos bajar, pero sí podemos aprender a disfrutar del infinito recorrido en esta.",

    ])
    const [random, setRandom] = useState(0)
    const pickRandomQuote = () => {
        let randomQuote = randomIndex(quotes)
        while (randomQuote == random) {
            randomQuote = randomIndex(quotes)
        }
        setRandom(randomQuote)
    }
    useEffect(() => {
        pickRandomQuote()
    }, [])
    const modalRef = useRef<null | HTMLDivElement>(null)
    useClickOutside(modalRef, () => setShowQuote(false))

    return (<>
        <div className={`${showQuote ? "modal" : "hide"}`}>
            <div ref={modalRef} className="quote">
                <span>
                    <VolunteerActivismIcon />
                    <p> {quotes[random]} </p>
                </span>
                <span className="quoteFooter">
                    <button onClick={pickRandomQuote}>Nueva Frase</button>
                </span>
            </div>
        </div>

        {/* <div onClick={() => setShowQuote(true)} className="quoteButton">
            <FaQuoteLeft />
        </div> */}

    </>)
}

export default Quotes
