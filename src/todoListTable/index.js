import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/action";

const List = () => {
  // Use the useState hook to initialize a state variable for storing the todos array
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState([]);

  const dispatch = useDispatch();

  // Use the useEffect hook to call the API and get the todos
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      });
  }, []);

  let data = {
    ToDo_ID: "",
    ToDo_Title: "",
    User_Id: "",
  };

  //view user button click
  const buttonClick = (id) => {
    axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    })
      .then((response) => {
        dispatch(
          storeUser({
            selectedUser: response.data.userId,
            todoID: response.data.id,
            todoTitle: response.data.title,
          })
        );
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function to render the action column
  const renderAction = (params) => {
    return (
      <button
        onClick={() => {
          buttonClick(params.row.id);
          //console.log(params.row);
        }}
      >
        {params.row.action}
      </button>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ToDo ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: true,
      sortable: false,
    },
    {
      field: "completed",
      headerName: "Status",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      editable: false,
      sortable: false,
      renderCell: renderAction,
    },
  ];

  // Map the todos array to an array of rows
  const rows = todos.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed ? "Completed" : "Not Completed",
      action: "View User",
    };
  });

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default List;
