import axios from "axios";
import { Dispatch, bindActionCreators } from "redux";
import { actionCreators, Action } from "state";
import { UserApi } from "types/UserApi";

const endpoint = "1https://jsonplaceholder.typicode.com/users";

export const fetchUsers = (dispatch: Dispatch<Action>) => {

  const { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } =
    bindActionCreators(actionCreators, dispatch);

  fetchUsersRequest();

  return (async () => {
    try {
      const response = await axios.get(endpoint);
      const users = response.data as UserApi[];
      fetchUsersSuccess(users);
    } catch (error) {
      fetchUsersFailure(error.message);
    }
  })();
};
