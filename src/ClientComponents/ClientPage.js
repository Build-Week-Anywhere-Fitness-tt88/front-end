import React, {useState, useEffect} from 'react';
import axios from  'axios';


const initialState = { 

}

export const ClientPage = () => {

    const [classes, setClasses] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
      ];

    useEffect(() => {

        // Retrieving the data from the server
        axios
            .get('https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes')
            .then(res => {
                console.log(res.data)
                setClasses(res.data)
                
            })
            .catch(error => {
                console.log(error)
            })
        
        const results = people.filter(elem => elem.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResults(results)

    },[searchTerm])

    const handleChange = e => {

        setSearchTerm(e.target.value)
    }
    

    return (

        // Creating a very rudimentary search bar

        <div>

        <p>
        {classes.map(elem => {
            return (`${elem.name} ` )
        })}

        </p>
        
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            >
            </input>
        
            <ul>
                {searchResults.map(item => {
                    {console.log(`This should show up: ${item}`)}
                    return (<li>{item}</li>)
                })}
            </ul>
            </div>
    )
}