import axios from "axios";

export const GET_USERS = "GET_USERS";
export const SET_USERS = "SET_USERS";
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";

const config={
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
};

const GetUsers=()=>{
    return{
        type: GET_USERS
    };
}

const SetUsers=(data)=>{
    return{
        type: SET_USERS,
        Users: data.allUsers,
        Connection: data.connections
    }
}

const Connect=()=>{
    return{
        type: CONNECT
    }
}

const Disconnect=()=>{
    return{
        type: DISCONNECT
    }
}

export function getAllUsers(){
    return(dispatch,getState)=>{
        dispatch(GetUsers());
        axios.get(`http://localhost:8000/api/${parseInt(localStorage.getItem("userID"))}`,config).then(
                resp => {
                    dispatch(SetUsers(resp.data));
                    return Promise.resolve();
                }, err=>{
                    console.error(err);
                    return Promise.reject(err);
                }
            )
    }
}

export function connectUser(user1,user2){
    return(dispatch, getState)=>{
        dispatch(Connect());
        axios.post('http://localhost:8000/api/connect', {
            user1: user1,
            user2: user2
        }, config).then(
            resp => {
                dispatch(getAllUsers());
                return Promise.resolve();
            }, err => {
                console.error(err);
                return Promise.reject(err);
            }
        )
    }
}

export function disConnect(user1,user2){
    return(dispatch, getState)=>{
        dispatch(Connect());
        axios.post('http://localhost:8000/api/disconnect', {
            user1: user1,
            user2: user2
        }, config).then(
            resp => {
                dispatch(getAllUsers());
                return Promise.resolve();
            }, err => {
                console.error(err);
                return Promise.reject(err);
            }
        )
    }
}