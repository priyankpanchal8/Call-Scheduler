import { connect } from 'react-redux'
import Schedule from '../components/Schedule'

import { getAllSchedules, createSchedule, updateSchedule, deleteSchedule } from '../actions/Schedule'


const mapStateToProps = (state, ownProps) => {
    const Schedule = state.Schedule;
    return {
        ...ownProps,
        ...Schedule
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSchedules: () => dispatch(getAllSchedules()),
        createSchedule: (userID, userID2, date, time) => dispatch(createSchedule(userID, userID2, date, time)),
        updateSchedule: (schID, date, time) => dispatch(updateSchedule(schID, date, time)),
        deleteSchedule: (id) => dispatch(deleteSchedule(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);