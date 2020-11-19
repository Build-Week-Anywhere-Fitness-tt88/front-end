import React from 'react';

export const ActivitiesList = ({ activities, deleteActivity, addSubmitHandler, addChangeHandler, editing, setEditing, editActivity, editActivityfunction, editSubmitHandler, editChangeHandler }) => {
    console.log("PROPS IN ACTIVITILIST - ACTIVITIES STATE", activities);

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