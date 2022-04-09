import React, { useState, useEffect } from 'react'
import "./audiobooks.scss"
import AudiobookPlayer from './audiobookPlayer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function Audiobooks() {
    const [showAudiobook, setShowAudiobook] = useState(false)
    const [audiobooks, setAudiobooks] = useState<any>([])
    const [currentAudiobook, setCurrentAudiobook] = useState<any>()

    useEffect(() => {
        // non-dynamic data - no need for database
        setAudiobooks([
            {
                photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2Fmain_liderazgo-el-poder-de-la-inteligencia-emocional-duze.jpg?alt=media&token=6defeaa1-2a02-41a2-ae62-e788435f50fb",
                audioURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2F002%20Liderazgo%20El%20poder%20de%20la%20inteligencia%20emocional.mp3?alt=media&token=e28d95da-04a1-45eb-8fc2-1be665c20209",
                title: "1.LIDERAZGO. EL PODER DE LA INTELIGENCIA EMOCIONAL ",
                author: "Daniel Goleman",
                link: "https://audioteka.com/es/audiobook/liderazgo-el-poder-de-la-inteligencia-emocional"
            },
            {
                photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2Fmain_inteligencia-emocional-una-guia-paso-a-paso-para-mejorar-ar-duze.jpg?alt=media&token=1e58312a-d595-4858-b0a6-ccbad0e7d6a4",
                audioURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2F03-inteligencia-emocional-una-guia-paso-a-paso-para-mejorar-ar.mp3?alt=media&token=4896ffa8-374a-4fb5-b0ad-91be9e535536",
                title: "2.	INTELIGENCIA EMOCIONAL ",
                author: "Leticia Caballero",
                link: "https://audioteka.com/es/audiobook/inteligencia-emocional-una-guia-paso-a-paso-para-mejorar-ar"
            },
            {
                title: "3.	EMOCIONES PARA LA VIDA  ",
                author: "Enric Corbera",
                link: "https://audioteka.com/es/audiobook/emociones-para-la-vida",
                photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2Fmain_emociones-para-la-vida-duze.jpg?alt=media&token=32a158bc-3ef4-47a5-a3b3-3f51391bfb0f",
                audioURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2F003%20Emociones%20para%20la%20vida.mp3?alt=media&token=8f9f720f-f071-4012-adba-f5ff57509143",
            },
            {
                photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2Fmain_bienestar-emocional-duze.jpg?alt=media&token=0d96d46d-6185-415b-ae75-bcce774f7100",
                audioURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/audiobooks%2F003%20Bienestar%20emocional.mp3?alt=media&token=efe62382-9c56-49b5-a156-cf29c531cbca",
                title: "4.	BIENESTAR EMOCIONAL  ",
                link: "https://audioteka.com/es/audiobook/bienestar-emocional",
                author: "Osho",
            },

        ])

        setCurrentAudiobook(audiobooks[0])

    }, [])

    return (<>
        <AudiobookPlayer audiobook={currentAudiobook} modalState={[showAudiobook, setShowAudiobook]} />

        <div className="audiobooks">
            {audiobooks.map((audiobook: any, key: number) => (

                <div key={key} onClick={() => {
                    setCurrentAudiobook(audiobooks[key])
                    setShowAudiobook(true)
                }} className="audiobookCard">
                    <img src={audiobook.photoURL} alt="" />

                    <PlayArrowIcon />
                </div>
            ))}
        </div>

    </>)
}

export default Audiobooks
