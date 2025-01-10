import axios from 'axios';

// Read from config.js that must be inside src folder
// import config from '../config';

const API_URL_USERS = '/users';
const API_URL_POSTS = '/posts';

export const getTypicodeUsers = async () => {
    const apiUrl = process.env.REACT_APP_TYPICODE_API_URL;
    // const apiUrl = config.runtimeSettings.REACT_APP_TYPICODE_API_URL;
    console.log('getTypicodeUsers - apiUrl: ' + apiUrl);

    try {
        return await axios.get(apiUrl + API_URL_USERS);
    } catch(error){
        console.log("Error while calling getTypicodeUsers API: ", error.message);
    }
};

export const getTypicodePosts = async () => {
    const apiUrl = process.env.REACT_APP_TYPICODE_API_URL;

    try {
        return await axios.get(apiUrl + API_URL_POSTS);
    } catch(error){
        console.log("Error while calling getTypicodePosts API: ", error.message);
    }
};