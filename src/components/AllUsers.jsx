import { Table, TableBody, TableCell, TableHead, TableRow, styled, Button, Modal, Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { getUsers, deleteUser } from '../service/api'; 
import { Link } from 'react-router-dom';

import Cookies from "js-cookie";

const StyledTable = styled(Table)`
    width: 80%;
    margin: 20px auto 0 auto;
`;

const THead = styled(TableRow)`
    background: #000;
    & > th {
        color: #fff;
        font-size: 20px;
    }
`;

const TBody = styled(TableRow)`
    & > td {
        font-size: 20px;
    }
`;

// Modal popup using ReactJS and Material-UI to confirm the deletion of a record.
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, recordName }) => {
    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="delete-confirmation-title" variant="h6" component="h2" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography id="delete-confirmation-description" sx={{ mb: 3 }}>
            Are you sure you want to delete <strong>{recordName}</strong>?
          </Typography>
          <Typography id="delete-warning" sx={{ mb: 3 }}>
            This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={onConfirm}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
};

const AllUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Stops Checking When Component Unmounts (clearInterval)
  useEffect(() => {
    getUserDetails();

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

  const getUserDetails = async () => {
      let response = await getUsers();
      /* debugger;
      console.log(response); */
      setListUsers(response.data);
  };

  const deleteUserData = async (id) => {
      await deleteUser(id);
      getUserDetails();
  };

  const handleDeleteClick = (record) => {
      setSelectedRecord(record);
      setIsModalOpen(true);
  }

  const handleConfirmDelete = () => {
      setIsModalOpen(false);
      deleteUserData(selectedRecord?.id);
      console.log(`Record ${selectedRecord} deleted`);
      setSelectedRecord(null);
  }

  return (
    <>
      {isAuthenticated && (
        <Button variant="contained" style={{marginLeft: 150, marginTop:20}} component={Link} to={`/AddUser`} >Add User</Button>
      )}
      {isAuthenticated && (
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>UserName</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>#</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {
                    listUsers.map(user => (
                        <TBody key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                                <Button variant="contained" style={{marginRight: 10}} component={Link} to={`/EditUser/${user.id}`} >Edit</Button>
                                {/* <Button variant="contained" color="error" onClick={() => deleteUserData(user.id)} >Delete</Button> */}
                                <Button variant="contained" color="error" onClick={() => handleDeleteClick(user)} >Delete</Button>
                            </TableCell>
                        </TBody>
                    ))
                }
            </TableBody>
        </StyledTable>
      )}
      {!isAuthenticated && (
          <Typography variant="h4">Eseguire il login!!!</Typography>
      )}
      
      <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          recordName={`Id: ${selectedRecord?.id} with email: ${selectedRecord?.email}`}
      /> 

    </>
  );
}

export default AllUsers;