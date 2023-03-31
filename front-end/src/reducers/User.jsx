import { GET_USERS, SET_USERS, CONNECT, DISCONNECT } from '../actions/User';

const User = (state = { fetching: false, Users: [], Connection: [] }, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                fetching: true
            }
            break;

        case SET_USERS:
            return {
                ...state,
                Users: action.Users,
                Connection: action.Connection,
                fetching: false
            }
            break;

        case CONNECT:
            return {
                ...state,
                fetching: true
            }
            break;

        case DISCONNECT:
            return {
                ...state,
                fetching: true
            }
        default:
            return {
                ...state
            }
            break;
    }
}

export default User;