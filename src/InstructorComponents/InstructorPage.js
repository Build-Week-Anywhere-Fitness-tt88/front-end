import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ActivitiesList } from './ActivitiesList';
import { ActivityDetails} from './ActivityDetails';
import './instructorPage.css';


export const InstructorPage = () => {
    const [activities, SetActivities] = useState([
        {
            name: "",
            type: "",
            time: "",
            duration: "",
            intensity: "",
            location : "",
            numberOfRegisteredAttendees: "",
            maxClassSize: "",
        }
    ]);

    useEffect(() => { 
        axios
            .get(` https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes`)
            .then((res) => {
                console.log("GET REQUEST", res.data);
                SetActivities(res.data);
            })
            .catch((err) => {
                console.log(err);
        })
    }, []);

    return (
        <div className = "component_div" >
            <ActivitiesList activities={activities} updateActivity={SetActivities}/>
            <ActivityDetails activities={activities}/>
        </div>
        
    )
}