import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Box, Button } from '@mui/material';

import { getTypicodePosts } from '../service/typicodeapi';

// You can centralize the environment variables in a configuration file for better management.
// Read from config.js that must be inside src folder
import config from '../config';

const PostDataGrid = () => {
    const [rows, setRows] = useState([]); // Data for rows

    useEffect(() => {
        handleGetAllPosts();

    }, []);

    const handleGetAllPosts = async () => {
        let response = await getTypicodePosts();
        debugger;
        console.log(response.data);
        // setRows(response.data);

        // Flatten JSON structure for DataGrid
        const formattedData = response.data.map((item) => ({
            userId: item.userId,
            id: item.id,
            title: item.title,
            body: item.body
        }));
        setRows(formattedData);
        console.log('Id: ' + response.data[0].id);
    }

    // Define columns for the DataGrid
    const columns = [
        { field: 'userId', headerName: 'ID User writes Post', width: 100 },
        { field: 'id', headerName: 'Post ID', width: 70 },
        { field: 'title', headerName: 'Post Title', width: 250 },
        { field: 'body', headerName: 'Post Body', width: 400 }
    ];

    return(
        <>
        <Stack spacing={2} sx={{ width: 800 }} marginTop={ 5 } marginLeft={ 50 } >
              <h1>React App - {config.runtimeSettings.appname} - All Posts from typicode</h1>
              <p>Version: {config.runtimeSettings.version}</p>
              <p>API URL: {config.apiUrlTypicode} - Environment: {config.environment}</p>
        </Stack>
        {!rows && (
        <Button
            variant="contained"
            color="primary"
            onClick={() => handleGetAllPosts()}
        >
            Get all posts
        </Button>
        )}
        <Box sx={{ height: 500, width: '100%' }}>
            <h2>Post Data without Pagination</h2>
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
        </Box>
        </>
    );

};

export default PostDataGrid;