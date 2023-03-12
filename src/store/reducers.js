import { actionTypes } from "./action";

//define the reducer to update the store based on the actions
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_USER:
      return {
        ...state,
        todoID: action.selectedUser.id,
        todoTitle: action.selectedUser.title,
        selectedUser: action.selectedUser.userId,
      };
    default:
      return state;
  }
};
