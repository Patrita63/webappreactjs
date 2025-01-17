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

export const getTypicodeUsersPagination = async (curPage, currPageSize) => {
    const environment = process.env.REACT_APP_ENVIRONMENT;
    console.log("getTypicodeUsersPagination environment: ", environment);
    const apiUrl = process.env.REACT_APP_TYPICODE_API_URL;
    // ;
    try {
        const response = await axios.get(apiUrl + API_URL_USERS);
        // Prima far vedere la response da Developers tools

        // Save data to localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));

        // Since jsonplaceholder.typicode.com doesn't support server-side pagination, I used slicing (data.slice(start, end)) to simulate it.
        // Vedere src\Table\DataGrid.jsx
        console.log('getTypicodeUsersPagination: CurrentPage = ' + curPage + ' - CurrentPageSize = ' + currPageSize);
        // Altrimenti vanno in errore ...

        return response;
    } catch (error){
        console.log("Error while calling getTypicodeUsersPagination API: ", error.message);
    }
}

export const getTypicodePosts = async () => {
    const apiUrl = process.env.REACT_APP_TYPICODE_API_URL;

    try {
        return await axios.get(apiUrl + API_URL_POSTS);
    } catch(error){
        console.log("Error while calling getTypicodePosts API: ", error.message);
    }
};


export const getTypicodePostsPagination = async (curPage, currPageSize) => {
    const environment = process.env.REACT_APP_ENVIRONMENT;
    console.log("getTypicodePostsPagination environment: ", environment);
    const apiUrl = process.env.REACT_APP_TYPICODE_API_URL;
    // ;
    try {
        const response = await axios.get(apiUrl + API_URL_POSTS);
        // Prima far vedere la response da Developers tools

        // Save data to localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));

        // Since jsonplaceholder.typicode.com doesn't support server-side pagination, I used slicing (data.slice(start, end)) to simulate it.
        // Vedere src\Table\DataGrid.jsx
        console.log('getTypicodePostsPagination: CurrentPage = ' + curPage + ' - CurrentPageSize = ' + currPageSize);
        // Altrimenti vanno in errore ...

        return response;
    } catch (error){
        console.log("Error while calling getTypicodePostsPagination API: ", error.message);
    }
}