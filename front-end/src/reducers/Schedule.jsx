import { CREATE_SCHEDULE, SET_ALL_SCHEDULES, UPDATE_SCHEDULE, GET_ALL_SCHEDULES, DELETE_SCHEDULE } from '../actions/Schedule';

const Schedule = (state = { fetching: false, ScheduleList: [], Connections: [] }, action) => {
    switch (action.type) {
        case GET_ALL_SCHEDULES:
            return {
                ...state,
                fetching: true
            }
            break;

        case SET_ALL_SCHEDULES:
            return {
                ...state,
                ScheduleList: action.ScheduleList,
                Connections: action.Connections,
                fetching: false
            }
            break;

        case CREATE_SCHEDULE:
            return {
                ...state,
                fetching: true
            }
            break;

        case UPDATE_SCHEDULE:
            return {
                ...state,
                fetching: true
            }
            break;

        case DELETE_SCHEDULE:
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

export default Schedule;