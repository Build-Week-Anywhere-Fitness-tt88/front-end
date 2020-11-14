import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://anywhere-fitness-tt-webpt-88.herokuapp.com", 
        headers: {
            Authorization: token
        }
    });
};