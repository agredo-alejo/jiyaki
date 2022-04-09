import React, { useState, useRef, useEffect } from 'react'
import "./activityCard.scss"
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { BsDropletFill } from "react-icons/bs";
import ProgressBar from 'react-customizable-progressbar'
import { constrain } from '../../shared/utils';
import { activities } from './activities';

export const icons = {
    meditation: <SelfImprovementIcon />,
    read: <AutoStoriesIcon />,
    sleep: <NightsStayIcon />,
    socialize: <PeopleAltIcon />,
    walk: <DirectionsWalkIcon />,
    water: <BsDropletFill />,
    default: <QuestionMarkIcon/>
}

function ActivityCard({onClick, cardInfo}:any) {
    const [progress, setProgress] = useState(10)
    const cardContentRef = useRef<null | HTMLDivElement>(null)
    const [parentHeight, setParentHeight] = useState(0)


    useEffect(() => {
        const handleResize = () => {
            const height = cardContentRef?.current?.clientHeight
            setParentHeight(height || 0)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])
    useEffect(() => {
        let percentage = cardInfo.currentCount / cardInfo.dailyGoal * 100 || 0
        percentage = constrain(percentage, 0, 100)
        setProgress(Math.ceil(percentage))
    }, [cardInfo])



    return (
        <div onClick={onClick} className="card">
            <div className="cardHeader">
                <h3> {cardInfo.title} </h3>
                {icons[cardInfo.name as activities] || icons["default"]}
            </div>
            <div ref={cardContentRef} className="cardContent">

                <ProgressBar

                    strokeColor="rgb(236, 192, 183)"
                    trackStrokeWidth={6}
                    strokeWidth={6}
                    progress={progress}
                    radius={parentHeight / 2 * .7}
                    className="progressBar"
                >
                    <p> {progress}% </p>
                </ProgressBar>

            </div>
        </div>
    )
}

export default ActivityCard
