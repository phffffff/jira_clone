import { combineReducers } from 'redux';

import userReducer from './userReducer/userReducer';
import loadReducer from './loadReducer/loadReducer'
import navigateReducer from './navigateReducer/navigateReducer'
import projectReducer from './projectReducer/projectRuducer';
import formReducer from './formReducer/formReducer';
import statusReducer from './taskReducer/statusReducer';
import taskReducer from './taskReducer/taskReducer';
import priorityReducer from './taskReducer/priorityReducer';

const rootReducer = combineReducers({
    stateUser: userReducer,
    stateLoad: loadReducer,
    stateNavigate: navigateReducer,
    stateProject: projectReducer,
    stateForm: formReducer,
    stateStatus: statusReducer,
    stateTask: taskReducer,
    statePriority: priorityReducer,
});

export default rootReducer;