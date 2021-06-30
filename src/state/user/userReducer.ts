import USERS from "./userTypes";

interface UserState {
    loading: boolean;
    users: any[];
    error: null | string
}

const initialState: UserState = {
    loading: true,
    users: [] as any[],
    error: null
}

export type Action = any

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