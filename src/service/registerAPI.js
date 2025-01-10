import axios from 'axios';

const API_URL_REGISTERUSERS = '/registeredUsers';

// React automatically loads environment variables defined in the .env file into the process.env object.
export const addRegisterUser = async (data) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
        return await axios.post(apiUrl + API_URL_REGISTERUSERS, data);
    } catch (error){
        console.log("Error while calling addRegisterUser API: ", error.message);
    }
}

export const getRegisteredUsers = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    try {
        return await axios.get(apiUrl + API_URL_REGISTERUSERS);
    } catch (error){
        console.log("Error while calling getRegisteredUsers API: ", error.message);
    }
}

// Function to check if email already exists in the database
export const checkRegiteredUserByEmailExists = async (email) => {
    try {
        // Fetch the list of users from the JSON server
        const listAllUsers = await getRegisteredUsers();
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

export const checkRegisteredUser = async (email, password) => {
    try {
        // Fetch the list of users from the JSON server
        const listAllUsers = await getRegisteredUsers();
        // debugger;
        
        // Check if the fetch request was successful
        if (listAllUsers.statusText !== "OK") {
            throw new Error('Error fetching data from JSON server');
        }

        // Check if exist a user with that email and password
        const userRegisterd = listAllUsers.data.some(user => user.email === email && user.password === password);

        return userRegisterd; // Returns true if user is registerd, false otherwise
    } catch (error) {
        console.error('Error checking email:', error);
        return false; // Default return false in case of error
    }
}