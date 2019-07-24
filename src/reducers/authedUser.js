import {SET_AUTHED_USER} from "../actions/authedUser";

export default function auth(state = {}, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return {
                ...state,
                account: action.account
            };

        default:
            return state
    }
}
