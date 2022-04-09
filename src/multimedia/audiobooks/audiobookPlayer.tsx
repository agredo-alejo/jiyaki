import React, { useRef, useState, useEffect } from 'react'
import "./audiobookPlayer.scss"
import { useClickOutside, secondsToMinutes } from '../../shared/utils'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';
import Slider from '@mui/material/Slider';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';

function AudiobookPlayer({ modalState, audiobook }: any) {
    const [showModal, setShowModal] = modalState
    const playerRef = useRef<null | HTMLDivElement>(null)
    const audioRef = useRef<null | HTMLAudioElement>(null)
    const [paused, setPaused] = useState(true)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(0.5)
    const [duration, setDuration] = useState(0)

    const playpause = () => {
        if (paused) {
            audioRef.current?.play()
            return
        }
        audioRef.current?.pause()
    }
    
    const add5s = () => {
        audioRef.current!.currentTime = Math.max(0, progress + 5)
    }
    const sub5s = () => {
        audioRef.current!.currentTime = Math.max(0, progress - 5)
    }

    useEffect(() => {
        if (showModal) return

        audioRef.current!.currentTime = 0
        audioRef.current?.pause()


    }, [showModal])

    useClickOutside(playerRef, () => setShowModal(false))
    return (<div className={`${showModal ? "modal" : "hide"}`}>

        <div ref={playerRef} className="audiobookPlayer">
            <audio ref={audioRef} src={audiobook?.audioURL}
                onTimeUpdate={e => {
                    setProgress(e.currentTarget.currentTime)
                }}
                onEnded={e => e.currentTarget.currentTime = 0}
                onPlay={() => setPaused(false)}
                onPause={() => setPaused(true)}
                onDurationChange={e => setDuration(e.currentTarget.duration)}
            ></audio>
            <div className="audiobookImg">

                <a className="audiobookLink" href={audiobook?.link} target="_blank">
                    <LinkIcon />
                </a>
                <img onClick={playpause} src={audiobook?.photoURL} alt="" />

            </div>
            <div className="audiobookControllers">
                <div className="audiobookProgress">
                    <p>
                        {secondsToMinutes(progress)}
                    </p>

                    <Slider
                        className="audiobookProgressSlider"
                        size="small"
                        min={0}
                        max={duration}
                        value={progress}
                        onChange={(e, value) => {
                            audioRef.current!.currentTime = value as number
                        }}

                    />
                    <p> {secondsToMinutes(duration)} </p>
                </div>

                <div className="flex">



                    <div className="audiobookTimeControllers">

                        <IconButton className="audiobookSkip" onClick={sub5s}>
                            <Replay5Icon />
                        </IconButton>

                        <IconButton
                            onClick={playpause}
                            className="audiobookPlay">
                            {paused ?
                                <PlayArrowIcon />
                                :
                                <PauseIcon />
                            }
                        </IconButton>

                        <IconButton className="audiobookSkip" onClick={add5s}>

                            <Forward5Icon />
                        </IconButton>
                    </div>
                    <div className="audiobookVolumeControllers">
                        <IconButton>

                            <VolumeDownIcon className="audiobookVolumeIcons" />
                        </IconButton>
                        <Slider
                            size="small"
                            className="audiobookVolume"
                            value={volume}
                            min={0}
                            max={1}
                            step={.01}
                            onChange={(e, value) => {
                                setVolume(value as number)
                                audioRef.current!.volume = volume
                            }}
                        />
                        <IconButton>

                            <VolumeUpIcon className="audiobookVolumeIcons" />
                        </IconButton>
                    </div>
                </div>
            </div>

        </div>
    </div>)
}

export default AudiobookPlayer
