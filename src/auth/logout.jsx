// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";

import styles from './Logout.module.css';

import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    Button
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";


const Logout = () => {
    // To navigate to another page
    const navigate = useNavigate();

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [username, setUsername] = useState('');

    const handleCancel = () => {
        // Redirect to home page 
        navigate("/");
    }

    // const handleLogout = async () => {
    //     setIsAuthenticated(false);
    //     localStorage.clear();
    //     // Redirect to home page 
    //     navigate("/");
    //   };

    const handleLogout = () => {
        Cookies.remove("isAuthenticated");
        Cookies.remove("username");
        // setIsAuthenticated(false);
        // setUsername("");
        // Redirect to home page 
        navigate("/");
    };

    return (
        <>
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Are you sure to Logout?</Typography>
    
                <Button className={styles.LogoutCancel}
                    color="error"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleCancel}
                >
                  Cancel
                </Button>
    
                <Button className={styles.Logout}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
          </Container>
          <br></br>
        </>
    )
};

export default Logout;