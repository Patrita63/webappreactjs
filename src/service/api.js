import axios from 'axios';

const API_URL_USERS = '/users';

// const API_URL = 'http://localhost:3002/users';

export const addUser = async (data) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('db.json - apiUrl: ' + apiUrl);
    try {
        return await axios.post(apiUrl + API_URL_USERS, data);
    } catch(error){
        console.log("Error while calling addUser API: ", error.message);
    }
};

export const getUsers = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('db.json - apiUrl: ' + apiUrl);
    try {
        return await axios.get(apiUrl + API_URL_USERS);
    } catch(error){
        console.log("Error while calling getUsers API: ", error.message);
    }
};

export const getUserById = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('db.json - apiUrl: ' + apiUrl);
    try {
        return await axios.get(`${apiUrl}${API_URL_USERS}/${id}`);
    } catch(error){
        console.log("Error while calling getUserById API: ", error.message);
    }
};

export const updateUser = async (data, id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('db.json - apiUrl: ' + apiUrl);
    try {
        // return await axios.put(`${API_URL}/${id}`, data);
        return await axios.put(`${apiUrl}${API_URL_USERS}/${id}`, data);
    } catch(error){
        console.log("Error while calling updateUser API: ", error.message);
    }
}

export const deleteUser = async (id) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('db.json - apiUrl: ' + apiUrl);
    try {
        // return await axios.delete(`${API_URL}/${id}`);
        return await axios.delete(`${apiUrl}${API_URL_USERS}/${id}`);
    } catch(error){
        console.log("Error while calling deleteUser API: ", error.message);
    }
};

// Function to check if email already exists in the database
export const checkUserByEmailExists = async (email) => {
    try {
        // Fetch the list of users from the JSON server
        const listAllUsers = await getUsers();
        // debugger;
        
        // Check if the fetch request was successful
        if (listAllUsers.statusText !== "OK") {
            throw new Error('Error fetching data from JSON server');
        }

        // Check if any user has the same email
        const emailExists = listAllUsers.data.some(user => user.email === email);

        return emailExists; // Returns true if email exists, false otherwise
    } catch (error) {
        console.error('Error checking email:', error);
        return false; // Default return false in case of error
    }
}