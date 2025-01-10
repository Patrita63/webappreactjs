import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import loadConfig from './configLoader';
import config from './config';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AllUsers from './components/AllUsers';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserDataGrid from './Table/UserDataGrid';
import PostDataGrid from './Table/PostDataGrid';


function App() {
  const [configJson, setConfigJson] = useState(null);
  useEffect(() => {
    const fetchConfig = async () => {
        const appConfig = await loadConfig();
        config.runtimeSettings = appConfig
        setConfigJson(config);
    };

    fetchConfig();
  }, []);

  if (!configJson) {
    return <div>Loading configuration...</div>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/allusers" element={<AllUsers />}></Route>
        <Route path="/adduser" element={<AddUser />}></Route>
        <Route path="/EditUser/:id" element={<EditUser />}></Route>
        <Route path="/UsersFromTypicodePagination" element={<UserDataGrid /> } />
        <Route path="/PostsFromTypicodePagination" element={<PostDataGrid /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
