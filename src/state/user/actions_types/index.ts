import { User } from "types/UserApi";
import USERS from "../userTypes";

interface FetchUsersRequest {
  type: USERS.FETCH_USERS_REQUEST;
}

interface FetchUsersSuccess {
  type: USERS.FETCH_USERS_SUCCESS;
  payload: User[];
}

interface FetchUsersFail {
  type: USERS.FETCH_USERS_FAIL;
  payload: string;
}

export type Action = FetchUsersRequest | FetchUsersSuccess | FetchUsersFail;
