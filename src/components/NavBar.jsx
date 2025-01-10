import React from 'react';

import { AppBar, styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

// Manage routing with react
import { NavLink } from "react-router-dom";

// Backtick
// ALT+96 = `

// Menù

const Header = styled(AppBar)`
    background: #1976d2;
`

const TabNavLink = styled(NavLink)`
    font-size: 1.75rem;
    margin-right: 2.5rem;
    color: inherit;
    text-decoration: none;
`

const NavBar = () => {
    return (
        <>
            <Header position='static'>
                <Toolbar>
                    <TabNavLink to="/">Go to Homepage</TabNavLink>
                    <TabNavLink to="/allusers">All Users</TabNavLink>
                    <TabNavLink to="/adduser">Add User</TabNavLink>
                </Toolbar>
            </Header>
        </>
    );
}

export default NavBar;
