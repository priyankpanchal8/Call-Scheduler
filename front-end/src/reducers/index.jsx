import { combineReducers } from 'redux';
import {COMPLETED_LOGOUT} from '../actions/Auth';

import HomeState from './HomeState';
import authState from './AuthState';
import Schedule from './Schedule';
import User from './User';

const appReducer = combineReducers({
    HomeState,
    authState,
    Schedule,
    User
});

const CallStore = (state,action) => {
    if (action.type === COMPLETED_LOGOUT)
    {
        state = undefined;
    }
    return appReducer(state,action);
}

export default CallStore