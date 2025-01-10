import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";

import styles from './Register.module.css';

import { RegisterData } from './Models/registerdata';
import { addRegisterUser, checkRegiteredUserByEmailExists } from './service/registerAPI';

import { NavLink } from "react-router-dom";

const Register = () => {
    // To navigate to another page
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");

    const handleCancel = () => {
        // Redirect to home page 
        navigate("/");
    }

    const handleRegister = async () => {
        const registerUserData = new RegisterData(name, surname, email, password, confirmpassword, address);
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
                console.log("Utente già registrato con mail: ", registerUserData.Email);
            }
        }
    };

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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        name="surname"
                        required
                        fullWidth
                        id="surname"
                        label="Surname"
                        autoFocus
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirmpassword"
                        label="confirmPassword"
                        type="password"
                        id="confirmpassword"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        name="address"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        autoFocus
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
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

                <Button className={styles.Register}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>

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