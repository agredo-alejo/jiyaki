import React from 'react'
import "./multimedia.scss"
import PodcastsIcon from '@mui/icons-material/Podcasts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Audiobooks from './audiobooks/audiobooks';
import Podcast from './podcast/podcast';
import Books from './books/books';


function Multimedia() {
    return (<>

        <section className="mutimediaSection">
            <div className="multimediaSectionHeader">

                <HeadphonesIcon />
                <p>audiolibros</p>
            </div>
            <Audiobooks />
        </section>
        <section className="mutimediaSection">
            <div className="multimediaSectionHeader">

                <PodcastsIcon />
                <p>podcast</p>
            </div>
            <Podcast />
        </section>
        <section className="mutimediaSection">
            <div className="multimediaSectionHeader">

                <MenuBookIcon />
                <p>libros</p>
            </div>
            <Books />
        </section>

    </>)
}

export default Multimedia
