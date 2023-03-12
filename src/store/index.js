import { reducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

//Define the initial state for the store
export const initialState = {
  todoID: null,
  todoTitle: null,
  selectedUser: null,
};

//Create the store
//export const store = createStore(reducer, initialState);

export const store = configureStore({
  reducer,
  preloadedState: initialState,
});

//export default store;
