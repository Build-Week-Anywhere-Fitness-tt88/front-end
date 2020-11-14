import React, { useState } from 'react';
import {axiosWithAuth} from '../util/axiosWithAuth';

export const ActivitiesList = ({ activities, setActivities }) => {
    console.log("PROPS IN ACTIVITILIST", activities);

    // Add Activity:
    const [addActivity, setAddActivity] = useState([
        {
            name: "",
            type: "",
            date: "",
            duration: "",
            intensity: "",
            location : "",
            numberOfRegisteredAttendees: "",
            maxClassSize: "",
        }
    ])
    const addActivityFunction = (e) => { 
        const newActivity = {
            name: e.name,
            type: e.type,
            date: e.date,
            duration: e.duration,
            intensity: e.intensity,
            location : e.location,
            numberOfRegisteredAttendees: e.numberOfRegisteredAttendees,
            maxClassSize: e.maxClassSize,
        };
        setAddActivity({ newActivity });
    };

    const addSubmitHandler = (e) => {
        e.preventDefault();
        addActivityFunction(addActivity);
        setAddActivity({
            name: "",
            type: "",
            date: "",
            duration: "",
            intensity: "",
            location: "",
            numberOfRegisteredAttendees: "",
            maxClassSize: "",
        });

        axiosWithAuth()
            .post(`/classes`, {
                name: addActivity.name,
                type: addActivity.type,
                date: addActivity.date,
                duration: addActivity.duration,
                intensity: addActivity.intensity,
                location: addActivity.location,
                numberOfRegisteredAttendees: addActivity.numberOfRegisteredAttendees,
                maxClassSize: addActivity.maxClassSize
            })
            .then((res) => {
                console.log("ADDING POST REQUEST", res);
                localStorage.setItem("token", res.data)
            })
            .catch((err) => {
                console.log(err);
        })
    };

    const addChangeHandler = (e) => {
        e.persist();
        setAddActivity({ ...addActivity, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2> Activities List</h2>
            <ul>
                {activities.map((item) => (
                    <li>
                        <span>
                            <span>
                                X
                            </span> {item.name}
                        </span>
                    </li>
                ))}
            </ul>
            <div>
                <form>
                    <div onClick={addSubmitHandler}>
                        <label>Add Activity</label>
                        <input
                            type = "text"
                            name="name"
                            placeholder="Name"
                            value={activities.name}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="type"
                            placeholder="Type"
                            value={activities.type}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="date"
                            placeholder="date"
                            value={activities.time}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="duration"
                            placeholder="Duration"
                            value={activities.duration}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="intensity"
                            placeholder="Intensity"
                            value={activities.intensity}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="location"
                            placeholder="location"
                            value={activities.location}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="numberOfRegisteredAttendees"
                            placeholder="Number Of Registered Attendees"
                            value={activities.numberOfRegisteredAttendees}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="maxClassSize"
                            placeholder="Max Class Size"
                            value={activities.maxClassSize}
                            onChange = {addChangeHandler}
                        />
                    </div>
                    <div>
                        <button type = "submit">Add</button>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}