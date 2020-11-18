import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ActivitiesList } from './ActivitiesList';
import { ActivityDetails} from './ActivityDetails';
import './instructorPage.css';
// import { axiosWithAuth } from '../util/axiosWithAuth';

const initialState = {
    name: "",
    type: "",
    time: "",
    duration: "",
    intensity: "",
    location: "",
    numberOfRegisteredAttendees: "",
    maxClassSize: 0,
};

export const InstructorPage = () => {
    const [activities, SetActivities] = useState([initialState]);

    // State to add the new activity to the list
    const [addActivity, setAddActivity] = useState(initialState);

    // States to edit the existing activities list
    const [editing, setEditing] = useState(false);
    const [editActivity, setEditActivity] = useState(initialState);

    const history = useHistory();

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
    }, [editActivity, addActivity]);

    // Add Activity:

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
        setAddActivity(initialState);
       
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
                console.log("ADDING POST REQUEST", res.data);
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

    // Delete Activiy //
    const deleteActivity = (item) => {
        
        axios
            .delete(`https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes/${item.id}`)
            .then((res) => {
                console.log("DELETE REQUEST", res);
                // history.push('/instructorPage');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Editing Activity: 
   

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
        <div className = "component_div" >
            <ActivitiesList
                activities={activities}
                deleteActivity={deleteActivity}
                addSubmitHandler={addSubmitHandler}
                addChangeHandler={addChangeHandler}
                editing={editing}
                setEditing = {setEditing}
                editActivity = {editActivity}
                editActivityfunction={editActivityfunction}
                editSubmitHandler={editSubmitHandler}
                editChangeHandler = {editChangeHandler}
            />
            <ActivityDetails activities={activities}/>
        </div>
        
    )
}