import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import Cookies from "js-cookie";

import styles from './Login.module.css';

import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";

import { checkRegisteredUser } from '../service/registerAPI';

const Login = () => {
    // To navigate to another page
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [username, setUsername] = useState('');

    const handleCancel = () => {
        // Redirect to home page
        navigate("/");
    }

    const handleLogin = async () => {
        const formData = new FormData();
        formData.set('Username', email);
        formData.set('Password', password);

        const isRegistered = await checkRegisteredUser(email, password);
        console.log('handleLogin - isRegistered: ' + isRegistered);
        // if(isRegistered) {
        //     if (typeof window !== "undefined") {
        //         localStorage.setItem("isAuthenticated", "true"); // Ensure it's a string
        //     }
        //     // global?.localStorage?.setItem("isAuthenticated", true);
        //     console.log("isAuthenticated set in localStorage:", localStorage.getItem("isAuthenticated"));

        //     // Small delay to ensure localStorage is updated
        //     setTimeout(() => {
        //         navigate("/");
        //     }, 100);
        // } else {
        //     alert('Utente non registrato!');
        // }
        if (isRegistered) {
            // Cookies.set("isAuthenticated", "true", { expires: 7 }); // Expires in 7 days
            // Cookies.set("username", email, { expires: 7 });

            Cookies.set("isAuthenticated", "true", { expires: 1 / 48, secure: true }); // Expires in 30 minutes
            Cookies.set("username", email, { expires: 1 / 48, secure: true });

            navigate("/"); // Redirect to homepage
        } else {
            alert("Utente non registrato!");
        }
    }

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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button className={styles.LoginCancel}
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button className={styles.Login}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            {/* https://stackoverflow.com/questions/38382153/multiple-classnames-with-css-modules-and-react */}
            <NavLink className={`${styles.CenterDiv} ${styles.UnderLine}`} to='/register'>Non hai un account? Registrati</NavLink>
          </Box>
        </Box>
      </Container>
      </>
    );

};

export default Login;