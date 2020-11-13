import React, { useState, useEffect } from 'react';
import axios from 'axios';


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

    const submitHandler = (e) => {
        e.preventDefault();
    }

    const changeHandler = (e) => {
        e.persist();
    }


    return (
        <div>
            <p>Instructor Page</p>
            <form>
                <div onClick = {submitHandler}>
                    <input
                        type = "text"
                        name="name"
                        placeholder="Name"
                        value={activities.name}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="type"
                        placeholder="Type"
                        value={activities.type}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="time"
                        placeholder="Time"
                        value={activities.time}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        value={activities.duration}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="intensity"
                        placeholder="Intensity"
                        value={activities.intensity}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="location"
                        placeholder="location"
                        value={activities.location}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="numberOfRegisteredAttendees"
                        placeholder="Number Of Registered Attendees"
                        value={activities.numberOfRegisteredAttendees}
                        onChange = {changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="maxClassSize"
                        placeholder="Max Class Size"
                        value={activities.maxClassSize}
                        onChange = {changeHandler}
                    />
                </div>
            </form>
        </div>
        
    )
}