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

  //async function to get todos
  const getTodos = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  //   let data = {
  //     ToDo_ID: "",
  //     ToDo_Title: "",
  //     User_Id: "",
  //   };

  //view user button click
  const buttonClick = async (id) => {
    //fiter todo by id
    const todo = await todos.filter((todo) => todo.id === id);
    console.log(todo, "todo");

    setTimeout(() => {
      dispatch(
        storeUser({
          todoID: todo.id,
          todoTitle: todo.title,
          selectedUser: todo.userId,
        })
      );
    }, 1000);
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
