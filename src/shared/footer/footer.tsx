import React, { useState } from 'react'
import "./footer.scss"


function Footer() {
    const [socialMedia, setSocialMedia] = useState([
        {
            link: "https://www.facebook.com/Jiyaki-107302598603132/",
            icon: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/socialMediaIcons%2Ffacebook.png?alt=media&token=57f5f034-b90e-48cc-8abe-94f359f00608"
        },
        {
            link: "https://youtube.com/channel/UCOXI7SQkGUoOvDejL_CTOYg",
            icon: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/socialMediaIcons%2Fyoutube.png?alt=media&token=7e3150f4-5014-4a75-99ab-b5429c8624c4"
        },
        {
            link: "https://www.tiktok.com/@jiyakiofficial",
            icon: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/socialMediaIcons%2Ftik-tok.png?alt=media&token=dce39b58-f7cb-4a67-b08b-f702c8625149"
        },
        {
            link: "https://instagram.com/jiyaki.official?utm_medium=copy_link",
            icon: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/socialMediaIcons%2Finsta.jpg?alt=media&token=09c2b8aa-db77-4c7e-ba86-844a6e378976"
        },
        {
            link: "https://twitter.com/JiyakiW?t=ZQp2eXwygGz4y34BKIUJXQ&s=09",
            icon: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/socialMediaIcons%2Ftwitter.png?alt=media&token=8ef05a3f-95a2-4b8d-83f4-14d372d56ff7"
        },
    ])
    return (
        <footer className="footer">
            <div>
                <h2>
                    Acerca de Jiyaki
                </h2>
                <p>
                    Esta es una página de apoyo motivacional, que busca el bienestar emocional de sus usuarios con el fin de brindar un servicio de calidad
                </p>
            </div>
            <div>
                <h2>
                    Siguenos en redes sociales
                </h2>
                <span>
                    {socialMedia.map((media: any, key: number) => (

                        <a key={key} target="_blank" href={media.link} >
                            <img src={media.icon} alt={`social media icon`} />
                        </a>
                    ))}

                </span>
            </div>
        </footer>
    )
}

export default Footer
