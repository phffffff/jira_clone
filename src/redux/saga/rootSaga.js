import { all } from 'redux-saga/effects'

import * as User from './actionSagas/userSaga';
import * as Project from './actionSagas/projectSaga';

function* rootSaga() {
    yield all([
        User.watchSignIn(),
        User.watchGetUserByKeyWord(),

        Project.watchGetProjectCategoryApi(),
        Project.watchCreateProjectApi(),
        Project.watchSetProjectApi(),
        Project.watchEditProjectApi(),
        Project.watchDelProjectApi(),
        Project.watchAssignUserProjectApi(),
        Project.watchRemoveUserFromProjectApi(),
        Project.watchGetProjectDetailApi()
    ])
}

export default rootSaga;