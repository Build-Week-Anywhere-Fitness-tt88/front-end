import React from 'react';

export const ActivityDetails = ({activities}) => {


    return (
        <div className = "activity_details">
            <h2> Activity Details</h2>
            {activities.map((item) => (
                <div className = "activity">
                    <h3>{item.name}</h3>
                    <p>{ item.type}</p>
                    <p>{ item.date}</p>
                    <p>{ item.duration}</p>
                    <p>{ item.intensity}</p>
                    <p>{ item.location}</p>
                </div>
            ))}
        </div>
    );
}