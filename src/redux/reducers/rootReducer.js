import { combineReducers } from 'redux';

import userReducer from './userReducer/userReducer';
import loadReducer from './loadReducer/loadReducer'
import navigateReducer from './navigateReducer/navigateReducer'
import projectReducer from './projectReducer/projectRuducer';
import formReducer from './formReducer/formReducer';

const rootReducer = combineReducers({
    stateUser: userReducer,
    stateLoad: loadReducer,
    stateNavigate: navigateReducer,
    stateProject: projectReducer,
    stateForm: formReducer,
});

export default rootReducer;