import React, { useState, useEffect } from "react";
import { AppBar, styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { AccountCircle } from '@mui/icons-material';
import {
    Button
  } from "@mui/material";

// Backtick
// ALT+96 = `

import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";

const TabNavLink = styled(NavLink)`
    font-size: 20px;
    margin-right: 20px;
    color: inherit;
    text-decoration: none;
`

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    // https://nextjs.org/docs/messages/react-hydration-error
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    // To navigate to another page
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const handleLogin = () => {
        // Redirect to intranet login page
        navigate("/auth/login");
    }
    
    const handleLogout = () => {
        // Redirect to intranet login page
        navigate("/auth/logout");
    }
    
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

    return (      
        <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Corso ReactJS WebApp
                </Typography>
                                
                {isAuthenticated && (
                <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome {username}
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
                )}

                {!isAuthenticated && (
                    <>
                        <div >
                            <Button  color="inherit" onClick={handleLogin}>Login</Button>
                        </div>
                    </>
                )}

                <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <TabNavLink to="/">Hello corso ReactJS</TabNavLink>
                        {/* <Link href="/" passHref>
                        Home web site
                        </Link> */}
                    </MenuItem>
                    {isAuthenticated && (
                    <>
                    <MenuItem onClick={handleMenuClose}>
                        <TabNavLink to="/AllUsers">All Users</TabNavLink>
                        {/* <Link href="/AllUsers" passHref>
                        All Users
                        </Link> */}
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <TabNavLink to="/UsersFromTypicodePagination">All Users Pagination</TabNavLink>
                        {/* <Link href="/UsersFromTypicodePagination" passHref>
                        All Users Pagination
                        </Link> */}
                    </MenuItem>
                    {/* <MenuItem onClick={handleMenuClose}>
                        <Link href="/intranet/allusers" passHref>
                        Utenti ...
                        </Link>
                    </MenuItem> */}
                    </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
        </>
    );

}

export default NavBar;