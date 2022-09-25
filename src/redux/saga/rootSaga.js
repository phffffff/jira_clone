import { all } from 'redux-saga/effects'

import * as User from './actionSagas/userSaga';
import * as Project from './actionSagas/projectSaga';
import * as Task from './actionSagas/taskSaga'

function* rootSaga() {
    yield all([
        User.watchSignIn(),
        User.watchGetUserByKeyWord(),
        User.watchGetUserByProjectId(),
        User.watchRemoveUserFromTask(),
        User.watchAssignUserTask(),

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
        Task.watchUpdateTaskApiSaga(),
        Task.watchDeleteTaskApi(),
        Task.watchGetTaskDetailApi(),
    ])
}

export default rootSaga;