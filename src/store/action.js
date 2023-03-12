//Define the actions to update the store
export const actionTypes = {
  SET_SELECTED_USER: "SET_SELECTED_USER",
};

//Define the action creators
export const storeUser = (selectedUser) => {
  return {
    type: actionTypes.SET_SELECTED_USER,
    selectedUser,
  };
};
