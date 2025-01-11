import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, FormGroup, InputLabel, Typography, Input, Button, styled, FormHelperText } from '@mui/material';
// Validation - added FormHelperText
// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

import { addUser, checkUserByEmailExists } from "../service/api";

import { useNavigate, Link } from 'react-router-dom';

import Cookies from "js-cookie";

const UserContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: white;
`;

const initialValues = {
    name: '',
    username: '',
    email: '',
    phone: ''
};

const AddUser = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // const [user, setUser] = useState(initialValues);

    const navigate = useNavigate();

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {
        const checkAuth = () => {
            const auth = Cookies.get("isAuthenticated") === "true"; // Convert to boolean
            const user = Cookies.get("username");
            setIsAuthenticated(auth);
            setUsername(user || "");
        };

        checkAuth(); // Run once when component mounts

        const interval = setInterval(checkAuth, 1000); // Check cookies every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Validation
    const { handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    // Validation
    const onSubmit = async (data) => {
        // debugger;
        console.log('Form Data:', data);
        const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            addUserDetails(data);
        }
        else
        {
            alert("Already exists a user with mail " + data.email);
        }
    };

    // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.name &&
        watchAllFields.username &&
        watchAllFields.email &&
        watchAllFields.phone &&
        !errors.role && // No errors on role
        !errors.name && // No errors on name
        !errors.username && // No errors on username
        !errors.email && // No errors on email
        !errors.phone && // No errors on phone
        Object.keys(errors).length === 0;
        // console.log('errors.role: ' + errors.role);
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    // const onValueChange = (e) => {
    //     console.log(e.target.name, e.target.value);
    //     setUser({ ...user, [e.target.name]: e.target.value});
    //     console.log(user);
    // };

    const addUserDetails = async (user) => {
        await addUser(user);

        // Ridirige alla allusers
        navigate('/allusers');
    };

    return (
        <UserContainer>
            {isAuthenticated && (
                <Typography variant="h4">Add User</Typography>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                {isAuthenticated && (
                    <Controller 
                        name="name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.name}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input {...field} id="name" />
                                <FormHelperText>{errors.name?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                )}
                {isAuthenticated && (
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Username is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.username}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input {...field} id="username" />
                            <FormHelperText>{errors.username?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                )}
                {isAuthenticated && (
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address',
                            },
                        }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.email}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input {...field} id="email" />
                            <FormHelperText>{errors.email?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                )}
                {isAuthenticated && (
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: 'Phone is required',
                            pattern: {
                            value: /^[0-9]+$/,
                            message: 'Enter a valid phone number',
                            },
                        }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.phone}>
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <Input {...field} id="phone" />
                            <FormHelperText>{errors.phone?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                )}
                {isAuthenticated && (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        disabled={!isFormValid()} // Button is disabled if the form is invalid
                        >
                        Add User
                    </Button>
                )}
                {isAuthenticated && (
                    <Button variant="contained" style={{marginLeft: 590, marginTop:20}} component={Link} to={`/AllUsers`} >Back</Button>
                )}
            </form>
            {!isAuthenticated && (
                <Typography variant="h4">Eseguire il login!!!</Typography>
            )}
        </UserContainer>
    );
}

export default AddUser;