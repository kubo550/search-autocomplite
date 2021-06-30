import USERS from "./userTypes";
import { UserApi } from "types/UserApi";
import { Action } from "./actions_types";

interface UserState {
    loading: boolean;
    users: UserApi[];
    error: null | string
}

const initialState: UserState = {
    loading: true,
    users: [],
    error: null
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case USERS.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USERS.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: null
            }
        case USERS.FETCH_USERS_FAIL:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer