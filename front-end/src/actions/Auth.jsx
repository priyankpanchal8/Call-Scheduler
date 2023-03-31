import axios from 'axios'

export const COMPLETED_LOGIN = "COMPLETED_LOGIN";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const COMPLETED_LOGOUT = "COMPLETED_LOGOUT";
export const COMPLETED_REGISTRATION = "COMPLETED_REGISTRATION";

const config={
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
};

export const completedLogin = (token,userID) => {
    localStorage.setItem("token",token);
    localStorage.setItem("userID",userID);
    return {
        type: COMPLETED_LOGIN,
        userID
    };
}

export const requestLogin = () => {
    return {
        type: REQUEST_LOGIN
    }
}

export const loginError = (errorMessage) => {
    return {
        type: LOGIN_ERROR,
        errorMessage
    };
}

export const completedLogout = () => {
    
    axios.post("http://localhost:8000/api/logout", null, config);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("LogOut");
    return {
        type: COMPLETED_LOGOUT
    };
}

export const completeRegistration = (email) => {
    return {
        type: COMPLETED_REGISTRATION,
        email
    }
}