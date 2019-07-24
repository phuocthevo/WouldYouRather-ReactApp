import { showLoading, hideLoading } from 'react-redux-loading';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(user) {
    return {
        type: SET_AUTHED_USER,
        account: user
    }
}

export function handleLoginUser(id) {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(setAuthedUser(id))
        dispatch(hideLoading())
    }
}

export function handleLogoutUser() {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(setAuthedUser(undefined))
        dispatch(hideLoading())
    }
}
