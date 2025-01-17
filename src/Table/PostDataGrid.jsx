import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Box } from '@mui/material';

import { getTypicodePostsPagination } from '../service/typicodeapi';

// You can centralize the environment variables in a configuration file for better management.
// Read from config.js that must be inside src folder
import config from '../config';

const PostDataGrid = () => {
    const [rows, setRows] = useState([]); // Data for rows

     // PAGINATION
     const [loading, setLoading] = useState(false); // Loading state

     const [paginationModel, setPaginationModel] = useState({
         page: 0,
         pageSize: 5,
     }); // Initialize pagination model
     const [rowCount, setRowCount] = useState(0); // Total row count (for pagination)
 
     useEffect(() => {
         debugger;
         getPostTypicode(paginationModel.page, paginationModel.pageSize);
     }, [paginationModel]);
 
     // Pagination
     const getPostTypicode = async (currentPage, currentPageSize) => {
         console.log('getPostTypicode: CurrentPage = ' + currentPage + ' - CurrentPageSize = ' + currentPageSize);
         setLoading(true); // Set loading state
         try {
             debugger;
             let response = await getTypicodePostsPagination(currentPage, currentPageSize);
            
             console.log(response);
             console.log('getPostTypicode - API Response Data:', response.data);

             
             // Mock pagination using slicing (since this API doesn't support server-side pagination)
             const start = currentPage * currentPageSize;
             const end = start + currentPageSize;
             const paginatedData = response.data.slice(start, end);
             console.log('getPostTypicode - paginatedData:', response.data);

            /* The issue where you see only one value (id or userId) being displayed correctly in the DataGrid rows is likely due to a conflict in how DataGrid manages the unique id field for each row.
            The id field is reserved by MUI DataGrid as the unique identifier for each row. If your data also contains an id property (such as the id from your API response), it may cause conflicts or unexpected behavior.
            To resolve this issue: */
             // Flatten JSON structure for DataGrid
            // const formattedData = paginatedData.map((item) => ({
            //     userId: item.userId,
            //     id: item.id,
            //     title: item.title,
            //     body: item.body
            // }));
            const formattedData = paginatedData.map((item) => ({
                id: item.id, // This is required for DataGrid as the unique row identifier
                userId: item.userId,
                postId: item.id, // Rename the API's id field to avoid conflicts
                title: item.title,
                body: item.body,
            }));
             console.log('getPostTypicode - formattedData: ', formattedData);
             setRows(formattedData);
             setRowCount(response.data.length); // Total number of rows for pagination
         } catch (error) {
             console.error('Error fetching data: ', error);
             alert('Error fetching data: ' + error);
         } finally {
             setLoading(false); // End loading state
         }
     };
     
    // Define columns for the DataGrid
    // const columns = [
    //     { field: 'userId', headerName: 'ID User', width: 100 },
    //     { field: 'id', headerName: 'Post ID', width: 70 },
    //     { field: 'title', headerName: 'Post Title', width: 250 },
    //     { field: 'body', headerName: 'Post Body', width: 400 }
    // ];

    const columns = [
        { field: 'userId', headerName: 'User ID', width: 70 },
        { field: 'postId', headerName: 'Post ID', width: 70 }, // Use postId instead of id
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'body', headerName: 'Body', width: 1150 },
    ];

    // Calculate DataGrid height
    const rowHeight = 52; // Default row height
    const headerHeight = 56;
    const footerHeight = 70; // Footer for pagination
    const gridHeight = rows.length * rowHeight + headerHeight + footerHeight;
    // Apply the Dynamic Height
    // Pass the calculated height as the style property to the container wrapping the DataGrid
    
    return(
        <>
        <Stack spacing={2} sx={{ width: 800 }} marginTop={ 5 } marginLeft={ 50 } >
              <h1>React App - {config.runtimeSettings.appname} - All Posts from typicode</h1>
              <p>Version: {config.runtimeSettings.version}</p>
              <p>API URL: {config.apiUrlTypicode} - Environment: {config.environment}</p>
        </Stack>
        <Box sx={{ height: gridHeight, width: '95%' }}>
            <h2>Post Data with Pagination</h2>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                // pageSize={pageSize} // Current page size
                rowCount={rowCount}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                pageSizeOptions={[5, 10, 15, 20, 50, 100]} // Include the desired page sizes
                // checkboxSelection
            />
        </Box>
        </>
    );

};

export default PostDataGrid;