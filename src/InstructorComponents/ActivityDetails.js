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
                    <div  key = {item.id}>
                        <h3>{item.name}</h3>
                        <p className = "paragraph">{ item.type}</p>
                        <p className = "paragraph">{ item.date}</p>
                        <p className = "paragraph">{ item.duration}</p>
                        <p className = "paragraph">{ item.intensity}</p>
                        <p className = "paragraph">{item.location}</p>
                    </div>
                    <div>
                        <button onClick = {() => addToCart(item)}>Enroll</button>
                    </div>
                </div>
                
            ))}
        </div>
    );
}