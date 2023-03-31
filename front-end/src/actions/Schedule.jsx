import axios from "axios";

export const GET_ALL_SCHEDULES = "GET_ALL_SCHEDULES";
export const SET_ALL_SCHEDULES = "SET_ALL_SCHEDULES";
export const CREATE_SCHEDULE = "CREATE_SCHEDULE";
export const UPDATE_SCHEDULE = "UPDATE_SCHEDULE";
export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
const config={
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
};
const GetAllSchedules = () => {
    return {
        type: GET_ALL_SCHEDULES
    };
}

const SetAllSchedules = (data) => {
    return {
        type: SET_ALL_SCHEDULES,
        ScheduleList: data.Schedule,
        Connections: data.Connections
    };
}

const CreateSchedule = () => {
    return {
        type: CREATE_SCHEDULE
    };
}

const UpdateSchedule = () => {
    return {
        type: UPDATE_SCHEDULE
    };
}

const DeleteSchedule = () => {
    return {
        type: DELETE_SCHEDULE
    };
}

export function getAllSchedules() {
    return (dispatch, getState) => {
        dispatch(GetAllSchedules());
        return axios.get(`http://127.0.0.1:8000/api/schedule/${parseInt(localStorage.getItem("userID"))}`, config).then(
            resp => {
                dispatch(SetAllSchedules(resp.data));
                return Promise.resolve();
            }, err =>{
                console.error(err);
                return Promise.reject(err);
            }
        )
    }
}

export function createSchedule(userID, userID2, date, time){
    return (dispatch, getState) =>{
        dispatch(CreateSchedule());
        return axios.post('http://localhost:8000/api/schedule',
            {
                userID: userID,
                userID2: userID2,
                date: date,
                time: time
            }, config).then(
                resp => {
                    return Promise.resolve();
                },
                err=>{
                    console.error(err);
                    return Promise.reject(err);
                }
            )
    }
}

export function updateSchedule(schID, date, time){
    return (dispatch, getState) =>{
        dispatch(UpdateSchedule());
        axios.put(`http://localhost:8000/api/schedule/${schID}`,
            {
                date: date,
                time: time
            }, config).then(
                resp => {
                    dispatch(getAllSchedules());
                    return Promise.resolve();
                },
                err=>{
                    console.error(err);
                    return Promise.reject(err);
                }
            )
    }
}

export function deleteSchedule(id){
    return(dispatch, getState) => {
        dispatch(DeleteSchedule());
        axios.delete(`http://localhost:8000/api/schedule/${id}`, config).then(
                resp => {
                    dispatch(getAllSchedules());
                    return Promise.resolve();
                }, err => {
                    console.error(err);
                    return Promise.reject(err);
                }
            )
    }
}