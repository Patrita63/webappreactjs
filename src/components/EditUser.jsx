import { useState, useEffect } from 'react';
import { FormControl, FormGroup, InputLabel, Input, Typography, Button, styled } from "@mui/material";

import { useNavigate, useParams } from 'react-router-dom';

import { getUserById, updateUser } from '../service/api';

const UserContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: white;
`

const initialValues = {
    name: '',
    username: '',
    email: '',
    phone: ''
};

const EditUser = () => {
    const [user, setUser] = useState(initialValues);

    const navigate = useNavigate();

    // Value passed in querystring

    // http://localhost:3000/EditUser/1
    // http://localhost:3000/EditUser?id=1
    const { id } = useParams();

    //  Line 30:8:  React Hook useEffect has a missing dependency: 'getUserData'. Either include it or remove the dependency array 
    // react-hooks/exhaustive-deps
    useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  // Runs only once

    const getUserData = async () => {
        let response = await getUserById(id);
        // debugger;
        console.log(response);
        setUser(response.data);
    };

    const updateUserDetails = async () => {
        await updateUser(user, id);
        navigate('/AllUsers');
    }

    const onValueChange = (e) => {
        console.log(e.target.name, e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    return(
        <>
            <UserContainer>
                <Typography variant="h4">Edit User with ID: {id}</Typography>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="name" value={user.name}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Username</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="username" value={user.username}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="email" value={user.email}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Phone</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} name="phone" value={user.phone}/>
                </FormControl>
                <FormControl>
                    <Button onClick={() => updateUserDetails()} variant="contained">Update User</Button>
                </FormControl>
            </UserContainer>
        </>
    );
}

export default EditUser;