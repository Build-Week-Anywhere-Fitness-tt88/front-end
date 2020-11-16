import React, { useState } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';
import { useHistory } from 'react-router-dom';

export const ActivitiesList = ({ activities, updateActivity }) => {
    console.log("PROPS IN ACTIVITILIST", activities);

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
            maxClassSize: "",
        }
    );

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
        setAddActivity([newActivity ]);
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
                maxClassSize: addActivity.maxClassSize})
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
        setAddActivity({...addActivity, [e.target.name]: e.target.value });
    };

    // Deleting Activity:

    const history = useHistory();

    const deleteActivity = (item) => {
        axiosWithAuth()
            .delete(`/classes/${item.id}`)
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
    const [editActivty, setEditActivity] = useState(
        {
            name: "",
            type: "",
            date: "",
            duration: "",
            intensity: "",
            location: "",
            numberOfRegisteredAttendees: "",
            maxClassSize: "",
        }
    );

    const editActivityfunction = (active) => {
        setEditing(true);
        console.log("EDITING", editing);
        setEditActivity(active);
        console.log("EDITACTIVITY", editActivty);
    };

    const editActivity = (ele) => {
        ele.preventDefault();
        axiosWithAuth()
            .put(`/classes/:id`, activities)
            .then((res) => {
                console.log("EDIT PUT REQUEST", res);
                updateActivity(res.data);
                history.push('/instructorPage');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className = "activities_main">
            <h2> Activities List</h2>
            <div>
            <ul>
                {activities.map((item) => (
                    <li key = {item.id} onClick = {() => editActivityfunction(item)}>
                        <span>
                            <span onClick={(e) => {
                                e.stopPropagation(); //need to know this purpose
                                deleteActivity(item);
                            }}>
                                X
                            </span> {item.name}
                        </span>
                    </li>
                ))}
                </ul>
                {editing && (
                    <form onSubmit = {editActivity}>
                        <h3>Edit Activity</h3>
                         <input
                            placeholder = "Activity Name"
                            onChange={(e) => setEditActivity({ ...editActivity, [e.target.name]: e.target.value })}
                            value={ editActivty.name}/>
                        <div>
                            <button type="submit">Save</button>
                            <button onClick = {() => setEditing(false)}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        
        {/* Adding */}
            <div>
            <form>
                <div onClick={addSubmitHandler}>
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