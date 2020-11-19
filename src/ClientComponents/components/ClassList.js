
import React, {useState, useEffect} from 'react';
import { useContext } from 'react'
import { ClassListContext } from '../contexts/ClassListContext'
import '../components/ClassList.css'


export const ClassList = () => {

    const { classes } = useContext(ClassListContext)

    // Add classes
    return (
        <div>
        <h2 id="header">Current List of Classes</h2>
        {classes.map(elem => {
            return (<div id={elem.id}> {elem.name} | {elem.duration} | {elem.date} | {elem.intensity} | {elem.location} | {elem.maxClassSize} | {elem.numberOfRegisteredAttendees} | {elem.type} </div> )
        })}    
        </div>
  
    )
}