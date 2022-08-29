import { all } from 'redux-saga/effects'

import * as User from './actionSagas/userSaga';
import * as Project from './actionSagas/projectSaga';

function* rootSaga() {
    yield all([
        //UserSaga
        User.watchSignIn(),
        //ProjectSaga
        Project.watchGetProjectApi(),
    ])
}

export default rootSaga;