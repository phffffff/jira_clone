import { combineReducers } from 'redux';

import userReducer from './userReducer/userReducer';
import loadReducer from './loadReducer/loadReducer'
import navigateReducer from './navigateReducer/navigateReducer'

const rootReducer = combineReducers({
    stateUser: userReducer,
    stateLoad: loadReducer,
    stateNavigate: navigateReducer,
});

export default rootReducer;