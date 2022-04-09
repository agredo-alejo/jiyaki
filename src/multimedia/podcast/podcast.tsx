import React, { useEffect, useState } from 'react'
import "./podcast.scss"
import { getYouTubeThumbnail, getYouTubeVideoId } from '../../shared/utils'

function Podcast() {

    const [podcast, setPodcast] = useState<any>([])

    // non-dynamic data - no need for database
    const urls = [
        {
            link: "https://www.youtube.com/watch?v=oAxXATiqRy8",
            name: "¿Y hablamos de depresión y ansiedad?",
            channel: "Se regalan dudas"
        },
        {
            link: "https://www.youtube.com/watch?v=uhZzB5hid6M",
            name: "Cambia tu mente cambia tu vida",
            channel: "TEDx"
        },
        {
            link: "https://www.youtube.com/watch?v=F8cqsiiOneU",
            name: "Claves para una buena salud mental",
            channel: "COMO SI NADIE ESCUHARA "
        },
        {
            link: "https://www.youtube.com/watch?v=rjSKVP6pNkI",
            name: "¿Cómo impacta tu infancia  en ti hoy?",
            channel: "1 MINUTO DE PSICOLOGIA"
        },
        {
            link: "https://www.youtube.com/watch?v=tMz6Aw3IFEU",
            name: "¿Cómo conseguir una autoestima sana?",
            channel: "INSTITUTO EUROPEO DE LA PSICOLOGIA POSITIVA"
        },
        {
            link: "https://www.youtube.com/watch?v=BxuAExzknDk",
            name: "Salud mental en tiempos de cuarentena",
            channel: "MI JET PRIVADO PODCAST"
        },
        {
            link: "https://www.youtube.com/watch?v=SFfmbLfKc9w",
            name: "Trabajar en tu salud mental",
            channel: "ROBERTO MTZ"
        },

        {
            link: "https://www.youtube.com/watch?v=WDqXWA5pBUE",
            name: "Inteligencia emocional",
            channel: "ENTIENDE TU MENTE "
        },
        {
            link: "https://www.youtube.com/watch?v=wJMgLZGG3AA",
            name: "Filosofía para tu desarrollo personal",
            channel: "GRANDES TESOROS VIVE"
        },
        {
            link: "https://www.youtube.com/watch?v=g3Rqg5hlgJk",
            name: "Cuidar tu bienestar emocional en cuarentena",
            channel: "INSTITUTO EUROPEO DE PSICOLOGIA POSITIVA "
        },



    ]
    useEffect(() => {

        const podcast_videoID = urls.map(url => {
            return { ...url, videoID: getYouTubeVideoId(url.link) }
        })

        setPodcast(podcast_videoID)

    }, [])


    return (

        <div className="podcast">


            {podcast.map((podcast: any, key: number) => (
                <div key={key} className="podcastContainer">

                    <a href={podcast.link} target="_blank">
                        <img src={getYouTubeThumbnail(podcast.videoID)} alt="" />
                    </a>


                    <div className="podcastInfo">
                        <h2> {podcast.name} </h2>
                        <p> {podcast.channel} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Podcast
