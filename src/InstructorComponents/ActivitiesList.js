import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const ActivitiesList = ({ activities }) => {
    console.log("PROPS IN ACTIVITILIST", activities);
    useEffect(() => { }, []);
    // Add Activity:

    const [addActivity, setAddActivity] = useState(
        {
            name: "",
            type: "",
            date: "",
            duration: "",
            intensity: "",
            location: "",
            numberOfRegisteredAttendees: "",
            maxClassSize: 0,
        }
    );

    const addActivityFunction = (e) => {
        const newActivity = {
            name: e.name,
            type: e.type,
            date: e.date,
            duration: e.duration,
            intensity: e.intensity,
            location: e.location,
            numberOfRegisteredAttendees: e.numberOfRegisteredAttendees,
            maxClassSize: e.maxClassSize,
        };
        setAddActivity([newActivity]);
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
            maxClassSize: 0
        });
       
        axios
            .post(`https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes`, {
                name: addActivity.name,
                type: addActivity.type,
                date: addActivity.date,
                duration: addActivity.duration,
                intensity: addActivity.intensity,
                location: addActivity.location,
                numberOfRegisteredAttendees: addActivity.numberOfRegisteredAttendees,
                maxClassSize: addActivity.maxClassSize})
            .then((res) => {
                console.log("ADDING POST REQUEST", res);
                setAddActivity(res.data);
                localStorage.setItem("token", res.data);
                history.push('/instructorPage');
            })
            .catch((err) => {
                console.log(err);
        })
    };

    const addChangeHandler = (e) => {
        e.persist();
        setAddActivity({ ...addActivity, [e.target.name]: e.target.value });
        console.log("addChangeHandler",addActivity);
    };

    // Deleting Activity:

    const history = useHistory();

    const deleteActivity = (item) => {
        axios
            .delete(`https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes/${item.id}`)
            .then((res) => {
                console.log("DELETE REQUEST", res);

                history.push('/instructorPage');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Editing Activity: 
    const [editing, setEditing] = useState(false);
    const [editActivity, setEditActivity] = useState(
        {
            name: "",
            type: "",
            date: "",
            duration: "",
            intensity: "",
            location: "",
            numberOfRegisteredAttendees: "",
            maxClassSize: 0,
        }
    );

    const editActivityfunction = (active) => {
        setEditing(true);
        console.log("EDITING", editing);
        setEditActivity(active);
        console.log("EDITACTIVITY", editActivity);
    };

    const editSubmitHandler = (ele) => {
        ele.preventDefault();
        axios
            .put(`https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes/${editActivity.id}`, {
                name: editActivity.name,
                type: editActivity.type,
                date: editActivity.date,
                duration: editActivity.duration,
                intensity: editActivity.intensity,
                location: editActivity.location,
                numberOfRegisteredAttendees: editActivity.numberOfRegisteredAttendees,
                maxClassSize: editActivity.maxClassSize})
            .then((res) => {
                console.log("EDIT PUT REQUEST", res);
                // updateActivity(res);
                setEditActivity(res);
                history.push('/instructorPage');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editChangeHandler = (e) => {
        e.persist();
        setEditActivity({ ...editActivity, [e.target.name]: e.target.value });
    }

    return (
        <div className = "activities_main">
            <h2> Activities List</h2>
            <div>
            <ul>
                {activities.map((item) => (
                    <li key={item.id} onClick={() => {editActivityfunction(item); console.log(item)}}>
                        
                        <span>
                            <span className = "delete" onClick={(e) => {
                                // e.stopPropagation(); //need to know this purpose
                                deleteActivity(item);
                            }}>
                                X
                            </span> {item.name}
                        </span>
                    </li>
                ))}
                </ul>
                {editing && (
                    <form onSubmit = {editSubmitHandler}>
                        <h3>Edit Activity</h3>
                        <div>
                            <input
                                name = "name"
                                onChange={editChangeHandler}
                                value={editActivity.name} />
                        </div>
                        <div>
                            <input
                                name = "type"
                                onChange={editChangeHandler}
                                value={ editActivity.type}/>
                        </div>
                        <div>
                            <input
                                name = "date"
                                onChange={editChangeHandler}
                                value={ editActivity.date}/>
                        </div>
                        <div>
                            <input
                                name = "duration"
                                onChange={editChangeHandler}
                                value={ editActivity.duration}/>
                        </div>
                        <div>
                            <input
                                name = "intensity"
                                onChange={editChangeHandler}
                                value={ editActivity.intensity}/>
                        </div>
                        <div>
                            <input
                                name = "location"
                                onChange={editChangeHandler}
                                value={ editActivity.location}/>
                        </div>
                        <div>
                            <button type="submit">Save</button>
                            <button onClick = {() => setEditing(false)}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        
        {/* Adding */}
            <div>
            <form onSubmit={addSubmitHandler}>
                <div>
                    <h3>Add Activity</h3>
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
                        placeholder="Day"
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
                        placeholder="No Of Reg Attendees"
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