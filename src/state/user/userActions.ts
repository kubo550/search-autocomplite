import axios from "axios"
import USERS from "./userTypes"

const endpoint = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => {
    return (dispatch: any) => {
        dispatch(fetchUsersRequest())
        axios
            .get(endpoint)
            .then(response => {
                const users = response.data
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

export const fetchUsersRequest = () => {
    return {
        type: USERS.FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess = (users: any) => {
    return {
        type: USERS.FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = (error: any) => {
    return {
        type: USERS.FETCH_USERS_FAIL,
        payload: error
    }
}