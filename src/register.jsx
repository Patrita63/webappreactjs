// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Typography,
    Input, FormControl, FormGroup, InputLabel,FormHelperText
} from "@mui/material";
// Validation - added Input, FormControl, FormGroup, InputLabel,FormHelperText

import { LockOutlined } from "@mui/icons-material";

import styles from './Register.module.css';

import { RegisterData } from './Models/registerdata';
import { addRegisterUser, checkRegiteredUserByEmailExists } from './service/registerAPI';

import { NavLink } from "react-router-dom";

/* "id": "8463",
"name": "Patrizio Tardiolo Bonifazi",
"surname": "patrita63",
"email": "p.tardiolobonifazi@vivasoft.it",
"password": "Viva",
"address": "Via Roma" */
const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: ''
};

const Register = () => {
    // To navigate to another page
    const navigate = useNavigate();

    // const [name, setName] = useState("");
    // const [surname, setSurname] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmpassword, setConfirmPassword] = useState("");
    // const [address, setAddress] = useState("");

    // Validation
    const { handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    // Validation
    const onSubmit = async (data) => {
        // debugger;
        console.log('Form Data:', data);
        /* const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            addUserDetails(data);
        }
        else
        {
            alert("Already exists a user with mail " + data.email);
        } */
        const registerUserData = new RegisterData(data.name, data.surname, data.email, data.password, data.confirmpassword, data.address);
        const isPasswordOK = registerUserData.checkPassword();
        console.log("Register - Password Confirmed = " + isPasswordOK);
        if(isPasswordOK){
            console.log("Mail da controllare: ", registerUserData.Email);
            const alreadyExist = await checkRegiteredUserByEmailExists(registerUserData.Email);
            console.log("alreadyExist: ", alreadyExist);
            if(!alreadyExist){
                await addRegisterUser(registerUserData);
                navigate('/');
            } else {
                alert("Utente già registrato con mail: " + registerUserData.Email);
                console.log("Utente già registrato con mail: ", registerUserData.Email);
                
            }
        }
        else {
            alert("La password di conferma non corrisponde; per favore verificare.");
        }
    };

    // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.name &&
        watchAllFields.surname &&
        watchAllFields.email &&
        watchAllFields.password &&
        watchAllFields.confirmpassword &&
        watchAllFields.address &&
        !errors.name && // No errors on name
        !errors.surname && // No errors on surname
        !errors.email && // No errors on email
        !errors.password && // No errors on password
        !errors.confirmpassword && // No errors on confirmpassword
        !errors.address && // No errors on address
        Object.keys(errors).length === 0;
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    const handleCancel = () => {
        // Redirect to home page 
        navigate("/");
    }

    // const handleRegister = async () => {
    //     const registerUserData = new RegisterData(name, surname, email, password, confirmpassword, address);
    //     const isPasswordOK = registerUserData.checkPassword();
    //     console.log("Register - Password Confirmed = " + isPasswordOK);
    //     if(isPasswordOK){
    //         console.log("Mail da controllare: ", registerUserData.Email);
    //         const alreadyExist = await checkRegiteredUserByEmailExists(registerUserData.Email);
    //         console.log("alreadyExist: ", alreadyExist);
    //         if(!alreadyExist){
    //             await addRegisterUser(registerUserData);
    //             navigate('/');
    //         } else {
    //             console.log("Utente già registrato con mail: ", registerUserData.Email);
    //         }
    //     }
    // };

    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Register</Typography>
                        <Box sx={{ mt: 3 }}>
                            <FormGroup>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
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
                                        {/* <TextField
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            autoFocus
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        /> */}
                                        </Grid>

                                        <Grid item xs={12}>
                                        <Controller
                                            name="surname"
                                            control={control}
                                            rules={{ required: 'Surname is required' }}
                                            render={({ field }) => (
                                                <FormControl fullWidth error={!!errors.surname}>
                                                <InputLabel htmlFor="surname">Surname</InputLabel>
                                                <Input {...field} id="surname" />
                                                <FormHelperText>{errors.surname?.message}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                        {/* <TextField
                                            name="surname"
                                            required
                                            fullWidth
                                            id="surname"
                                            label="Surname"
                                            autoFocus
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                        /> */}
                                        </Grid>

                                        <Grid item xs={12}>
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
                                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                                <Input {...field} id="email" />
                                                <FormHelperText>{errors.email?.message}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                        {/* <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        /> */}
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: 'password is required'
                                            }}
                                            render={({ field }) => (
                                                <FormControl fullWidth error={!!errors.password}>
                                                <InputLabel htmlFor="password">Password</InputLabel>
                                                <Input {...field} id="password" type="password" />
                                                <FormHelperText>{errors.password?.message}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                        {/* <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        /> */}
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Controller
                                            name="confirmpassword"
                                            control={control}
                                            rules={{
                                                required: 'Confirm password is required'
                                            }}
                                            render={({ field }) => (
                                                <FormControl fullWidth error={!!errors.confirmpassword}>
                                                <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                                                <Input {...field} id="confirmpassword" type="password"  />
                                                <FormHelperText>{errors.confirmpassword?.message}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                        {/* <TextField
                                            required
                                            fullWidth
                                            name="confirmpassword"
                                            label="confirmPassword"
                                            type="password"
                                            id="confirmpassword"
                                            value={confirmpassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        /> */}
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Controller
                                            name="address"
                                            control={control}
                                            rules={{ required: 'Address is required' }}
                                            render={({ field }) => (
                                                <FormControl fullWidth error={!!errors.username}>
                                                <InputLabel htmlFor="address">Address</InputLabel>
                                                <Input {...field} id="address" />
                                                <FormHelperText>{errors.address?.message}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                        {/* <TextField
                                            name="address"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            autoFocus
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        /> */}
                                        </Grid>
                                    </Grid>

                                    <Button className={styles.RegisterCancel}
                                        fullWidth
                                        color="error"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        disabled={!isFormValid()} // Button is disabled if the form is invalid
                                        >
                                        Register User
                                    </Button>

                                    {/* <Button className={styles.Register}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </Button> */}
                                </form>
                            </FormGroup>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    {/* https://stackoverflow.com/questions/38382153/multiple-classnames-with-css-modules-and-react */}
                                    <NavLink className={`${styles.CenterDiv} ${styles.UnderLine}`} to='/auth/login'>Hai già un account? Accedi</NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;