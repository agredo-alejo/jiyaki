import React from 'react'
import "./settings.scss"
import Profile from './profile/profile';
import DailyGoals from './dailyGoals/dailyGoals';

function Settings() {


    return (
        <div className="settings">
            <Profile />
            <DailyGoals />
        </div>
    )
}

export default Settings


