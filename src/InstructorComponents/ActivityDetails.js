import React, {useState} from 'react';

export const ActivityDetails = ({activities}) => {

    const [cart, setCart] = useState([]);

    const addToCart = (e) => {
        setCart({ ...cart, e });
        console.log("CART", e);
    }

    return (
        <div className = "activity_details">
            <h2> Activity Details</h2>
            {activities.map((item) => (
                <div className="activity">
                    <div>
                        <h3>{item.name}</h3>
                        <p>{ item.type}</p>
                        <p>{ item.date}</p>
                        <p>{ item.duration}</p>
                        <p>{ item.intensity}</p>
                        <p>{item.location}</p>
                    </div>
                    <div>
                        <button onClick = {() => addToCart(item)}>Enroll</button>
                    </div>
                </div>
                
            ))}
        </div>
    );
}