import USERS from "./userTypes";
import { Dispatch } from "redux";
import { Action } from "./actions_types";
import { User } from "types/UserApi";

export const fetchUsersRequest = () => {
  return (dispatch: Dispatch<Action>) =>
    dispatch({
      type: USERS.FETCH_USERS_REQUEST,
    });
};

export const fetchUsersSuccess = (users: User[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: USERS.FETCH_USERS_SUCCESS,
      payload: users,
    });
  };
};

export const fetchUsersFailure = (error: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: USERS.FETCH_USERS_FAIL,
      payload: error,
    });
  };
};
