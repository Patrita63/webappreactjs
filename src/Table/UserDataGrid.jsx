import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Box } from '@mui/material';

import { getTypicodeUsersPagination } from '../service/typicodeapi';

/* fieldhidden.Module.css */
// The [data-field="id"] selector specifically targets the id column in the DataGrid and hides it.
import './fieldhidden.Module.css';

// You can centralize the environment variables in a configuration file for better management.
// Read from config.js that must be inside src folder
import config from '../config';

const UserDataGrid = () => {
    const [rows, setRows] = useState([]); // Data for rows

    // PAGINATION
    const [loading, setLoading] = useState(false); // Loading state

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    }); // Initialize pagination model
    const [rowCount, setRowCount] = useState(0); // Total row count (for pagination)

    // useEffect(() => {
    //     handleGetAllUsers();

    // }, []);

    // const handleGetAllUsers = async () => {
    //     let response = await getTypicodeUsers();
    //     debugger;
    //     console.log(response.data);
    //     // setRows(response.data);

    //     // Flatten JSON structure for DataGrid
    //     const formattedData = response.data.map((item) => ({
    //         id: item.id,
    //         name: item.name,
    //         username: item.username,
    //         email: item.email,
    //         street: item.address.street,
    //         city: item.address.city,
    //         zipcode: item.address.zipcode,
    //         lat: item.address.geo.lat,
    //         lng: item.address.geo.lng,
    //         phone: item.phone,
    //         website: item.website,
    //         company: item.company.name,
    //     }));
    //     setRows(formattedData);
    //     console.log('Id: ' + response.data[0].id);
    // }

    // Pagination
    useEffect(() => {
        debugger;
        getUserTypicode(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel]);

    // Pagination
    const getUserTypicode = async (currentPage, currentPageSize) => {
        console.log('getUserTypicode: CurrentPage = ' + currentPage + ' - CurrentPageSize = ' + currentPageSize);
        setLoading(true); // Set loading state
        try {
            debugger;
            let response = await getTypicodeUsersPagination(currentPage, currentPageSize);
           
            console.log(response);
            
            // Mock pagination using slicing (since this API doesn't support server-side pagination)
            const start = currentPage * currentPageSize;
            const end = start + currentPageSize;
            const paginatedData = response.data.slice(start, end);
            
            // Flatten JSON structure for DataGrid
            const formattedData = paginatedData.map((item) => ({
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
            street: item.address.street,
            city: item.address.city,
            zipcode: item.address.zipcode,
            lat: item.address.geo.lat,
            lng: item.address.geo.lng,
            phone: item.phone,
            website: item.website,
            company: item.company.name,
            }));
            console.log(formattedData);
            setRows(formattedData);
            setRowCount(response.data.length); // Total number of rows for pagination
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // End loading state
        }
    };
    // console.log(tableData);

    // Define columns for the DataGrid
    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'username', headerName: 'Username', width: 120 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'street', headerName: 'Street', width: 150 },
        { field: 'city', headerName: 'City', width: 130 },
        { field: 'zipcode', headerName: 'Zipcode', width: 100 },
        { field: 'lat', headerName: 'Latitude', width: 100, sortable: false },
        { field: 'lng', headerName: 'Longitude', width: 100, sortable: false },
        { field: 'phone', headerName: 'Phone', width: 180, sortable: false },
        // { field: 'website', headerName: 'Website', width: 150, sortable: false },
        { field: 'company', headerName: 'Company', width: 150 },
    ];

    return(
        <>
        {/* <Stack spacing={2} sx={{ width: 800 }} marginTop={ 5 } marginLeft={ 50 } >
              <h1>React App - {config.runtimeSettings.appname} - All Users from typicode</h1>
              <p>Version: {config.runtimeSettings.version}</p>
              <p>API URL: {config.apiUrlTypicode} - Environment: {config.environment}</p>
        </Stack> */}

        {/* {!rows && (
        <Button
            variant="contained"
            color="primary"
            onClick={() => handleGetAllUsers()}
        >
            Get all users
        </Button>
        )}

        <Box sx={{ height: 500, width: '100%' }}>
            <h2>User Data without Pagination</h2>
            <DataGrid
                rows={rows}
                columns={columns}
                // loading={loading}
                pagination
                paginationMode="server"
                // rowCount={rowCount}
                // paginationModel={paginationModel}
                // onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection
            />
        </Box> */}

        <Stack spacing={2} sx={{ width: 800 }} marginTop={ 5 } marginLeft={ 50 } >
              <h1>React App - {config.runtimeSettings.appname} - All Users from typicode</h1>
              <p>Version: {config.runtimeSettings.version}</p>
              <p>API URL: {config.apiUrlTypicode} - Environment: {config.environment}</p>
        </Stack>

        <Box sx={{ height: 500, width: '100%' }}>
            <h2>User Data with Pagination</h2>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                // pageSize={pageSize} // Current page size
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                pageSizeOptions={[5, 10, 20, 50, 100]} // Include the desired page sizes
                // checkboxSelection
            />
        </Box>
        </> 
    );

};

export default UserDataGrid;