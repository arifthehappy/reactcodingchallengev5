import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const state = useSelector((state) => state);

  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [todoId, setTodoId] = useState("");
  const [todoTitle, setTodoTitle] = useState("");

  //update state of selected user
  useEffect(() => {
    setUserId(state.selectedUser);
    setTodoId(state.todoID);
    setTodoTitle(state.todoTitle);
    console.log(state, "state");
  }, [state]);

  //get user details
  useEffect(() => {
    axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/users/${userId}`,
    })
      .then((response) => {
        //console.log(response.data);
        setUser(response.data, "here");
      })
      .catch((error) => {
        console.log(error, "yaha");
      });
  }, [userId]);

  return (
    <div style={{ border: "2px solid black" }}>
      <h2>User Detail</h2>

      <p> ToDo Id </p>

      <p>ToDo Title</p>
      <p>
        User Id <span>{console.log(userId)}</span>
      </p>
      <p>
        Name <span>{console.log(user)}</span>
      </p>
      <p>Email</p>
    </div>
  );
};

export default UserDetails;
