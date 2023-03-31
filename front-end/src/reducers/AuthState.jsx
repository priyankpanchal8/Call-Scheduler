import {
    COMPLETED_LOGIN, COMPLETED_LOGOUT, REQUEST_LOGIN, LOGIN_ERROR, COMPLETED_REGISTRATION
} from '../actions/Auth'


const authState = (state = {refreshRT: false,isAuthenticated: sessionStorage.getItem("token") ? true : false, userID: sessionStorage.getItem("userID") ? sessionStorage.getItem("userID") : null, isRequested: false }, action) => {
    switch (action.type) {
        case COMPLETED_LOGIN:
            return {isAuthenticated: true, email:  action.email, isRequested: false, refreshRT: true };
            break;
        case LOGIN_ERROR:
            return {isAuthenticated: false, email: null, isRequested: false, refreshRT:false };
            break;
        case COMPLETED_LOGOUT:
            return {isAuthenticated: false, email: null,isRequested: false, refreshRT: true};
            break;
        case REQUEST_LOGIN:
            return {...state, isRequested: true };
            break;
        case COMPLETED_REGISTRATION:
            return {...state, ...{email: action.email}};
            break;
        default:
            return state;
            break;
    }
}

export default authState;