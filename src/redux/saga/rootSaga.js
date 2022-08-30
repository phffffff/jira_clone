import { all } from 'redux-saga/effects'

import * as User from './actionSagas/userSaga';
import * as Project from './actionSagas/projectSaga';

function* rootSaga() {
    yield all([
        User.watchSignIn(),

        Project.watchGetProjectCategoryApi(),
        Project.watchCreateProjectApi(),
        Project.watchSetProjectApi(),
    ])
}

export default rootSaga;