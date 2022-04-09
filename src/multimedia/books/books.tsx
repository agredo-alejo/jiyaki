import React, { useState } from 'react'
import "./books.scss"

// non-dynamic data - no need for database
const urls = [
    {
        link: "https://www.amazon.es/gp/product/8472453715/ref=as_li_tl?ie=UTF8&camp=3638&creative=24630&creativeASIN=8472453715&linkCode=as2&tag=somosestupend-21&linkId=5a0ae9bf2495720988a5f3f145474cbe",
        name: "1.	INTELIGENCIA EMOCIONAL ",
        author: "Daniel Goleman",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2FINTELIGENCIA%20EMOCIONAL%20(Daniel%20Goleman).jpeg?alt=media&token=7127fd3a-86e6-433d-8681-e4b7958b45c5"
    },
    {
        link: "https://www.amazon.es/gp/product/8433015117/ref=as_li_tl?ie=UTF8&camp=3638&creative=24630&creativeASIN=8433015117&linkCode=as2&tag=somosestupend-21&linkId=70b57173582397ee28d97ced10f51bc7",
        name: "2.	EMOCIONES: UNA GUIA INTERNA, CUALES SIGO Y CUALES NO ",
        author: "Leslie Greenberg",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2FEMOCIONES%20UNA%20GUIA%20INTERNA%2C%20CUALES%20SIGO%20Y%20CUALES%20NO%20(Leslie%20Greenberg).jpeg?alt=media&token=471f338f-992c-4c98-8dc3-a400466aae5c"
    },
    {
        link: "https://www.amazon.es/gp/product/8408223305/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=somosestupend-21&creative=24630&linkCode=as2&creativeASIN=8408223305&linkId=997cdfec4de53e758e4220a0dbffad11",
        name: "3.	LO BUENO DE TENER UN MAL DIA  ",
        author: "Anabel Gonzales",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2Flo%20bueno%20de%20tener%20un%20mal%20dia%20Anabel%20Gonzales.jpeg?alt=media&token=0851d940-0bbc-4543-8b29-ad4ca76eed78"
    },
    {
        link: "https://www.amazon.es/gp/product/8416256365/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=somosestupend-21&creative=24630&linkCode=as2&creativeASIN=8416256365&linkId=438b8c4633eb12e37deeb502814e4b31",
        name: "4.	LA BELLEZA DE SENTIR. DE LAS EMOCIONES A LA SENSIBILIDAD  ",
        author: "Eva Bach",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2Fla%20belleza%20de%20sentir%20Eva%20Bach.jpeg?alt=media&token=60d0a3e4-a7e1-452f-977b-ebc01cacb534"
    },
    {
        link: "https://libroayudate.files.wordpress.com/2015/07/norberto-levy-la-sabiduria-de-las-emociones.pdf",
        name: "5.	LA SABIDURIA DE LAS EMOCIONES  ",
        author: "Norberto Levy",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2Fla%20sabiduria%20de%20las%20emociones%20Norberto%20Levy.jpg?alt=media&token=d2184b93-9f39-4050-9829-394bda89449f"
    },
    {
        link: "https://www.amazon.es/gp/product/8494958003/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=somosestupend-21&creative=24630&linkCode=as2&creativeASIN=8494958003&linkId=bff61ca027d7288640504a0ae3fa90fd",
        name: "6.	EL MUNDO DE LAS EMOCIONES",
        author: "Mireia Simó Rel",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2Fel%20mundo%20de%20las%20emociones%20Mireia%20Sim%C3%B3%20Rel.jpg?alt=media&token=14b5eb73-9b5c-4771-a1e0-0367fad79cf4"
    },
    {
        link: "https://www.amazon.es/gp/product/B07F1DCHQG/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=somosestupend-21&creative=24630&linkCode=as2&creativeASIN=B07F1DCHQG&linkId=7a1aac6942918eebb75d362c22b107a3",
        name: "7.	EMOCIONES PARA LA VIDA. EL CAMINO HACIA TU BIENESTAR ",
        author: "Enric Corbera",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/jiyaki.appspot.com/o/books%2Femociones%20para%20la%20vida%20Enric%20Corbera.jpg?alt=media&token=8f991265-629f-4aa7-981f-9f891b9464dd"
    },

]

function Books() {
    const [books, setBooks] = useState(urls)

    
    return (
        <div className="books">
            {books.map((book:any, key: number)=>(
                <div key={key} className="bookContainer">
                    <a href={book.link} target="_blank">
                    <img src={book.photoURL} alt=""/>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Books
 