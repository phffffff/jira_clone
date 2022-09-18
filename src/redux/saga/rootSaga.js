import { all } from 'redux-saga/effects'

import * as User from './actionSagas/userSaga';
import * as Project from './actionSagas/projectSaga';
import * as Task from './actionSagas/taskSaga'

function* rootSaga() {
    yield all([
        User.watchSignIn(),
        User.watchGetUserByKeyWord(),
        User.watchGetUserByProjectId(),

        Project.watchGetProjectCategoryApi(),
        Project.watchCreateProjectApi(),
        Project.watchGetProjectApi(),
        Project.watchEditProjectApi(),
        Project.watchDelProjectApi(),
        Project.watchAssignUserProjectApi(),
        Project.watchRemoveUserFromProjectApi(),
        Project.watchGetProjectDetailApi(),

        Task.watchGetTaskTypeApiSaga(),
        Task.watchGetStatusApiSaga(),
        Task.watchGetPriorityApiSaga(),
        Task.watchCreateTaskApiSaga(),
    ])
}

export default rootSaga;