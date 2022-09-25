import { takeLatest, put, call, delay, select } from 'redux-saga/effects';

import { LOGIN_USER_API_SAGA, ADD_MENBER_WITH_KEYWORD_SAGA, GET_USER_BY_PROJECT_ID_API_SAGA, REMOVE_USER_FROM_TASK_API_SAGA, ASSIGN_USER_TASK_API_SAGA } from '../../constants/constantsApi'
import ServiceUser from '../../../services/ServiceUser';
import { addLoading, removeLoading } from '../../actions/actionLoading/actionLoading';
import { TOKEN, USER_LOGIN } from '../../../utils/constantsApi';
import { actionPushUserByProjectId, pushMenberAction, pushUserAction } from '../../actions/actionUser/actionUser';
import { actionGetProjectDetailSaga } from '../../actions/actionProject/actionProjectApi';
import { actionSetTaskDetail } from '../../actions/actionTask/actionTask';
import { actionGetTaskDetailApiSaga, actionUpdateTaskApiSaga } from '../../actions/actionTask/actionTaskApi';
import ServiceTask from '../../../services/ServiceTask';

function* signIn(action) {
    yield put(addLoading())

    yield delay(500)

    try {
        const { payload } = action
        const { data, status } = yield call(() => ServiceUser.userSignIn(payload));

        if (status === 200) {
            localStorage.setItem(TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        }

        yield put(pushUserAction(data.content))

        const navigate = yield select(state => state.stateNavigate.navigate);

        navigate('/ListProject', {
            replace: true,
        })

    } catch (error) {
        alert(error.response.data.message);
    }
    yield put(removeLoading());
}

function* watchSignIn() {
    yield takeLatest(LOGIN_USER_API_SAGA, signIn)
}

function* getUserByKeyWord(action) {
    try {
        const { payload } = action;
        const { data, status } = yield call(() => ServiceUser.getUserWithKeyword(payload));

        if (status === 200) {
            yield put(pushMenberAction(data.content));
        }

    } catch (error) {
        console.log(error.response.data);
    }
}

function* watchGetUserByKeyWord() {
    yield takeLatest(ADD_MENBER_WITH_KEYWORD_SAGA, getUserByKeyWord)
}


function* removeUserFromTask(action) {
    try {
        const { payload } = action;
        const { userData } = payload;
        const { projectId } = payload;

        const { data, status } = yield call(() => ServiceUser.removeUserFromTask(userData));

        if (status === 200) {
            yield put(actionGetProjectDetailSaga(projectId))
            yield put(actionGetTaskDetailApiSaga(userData.taskId))
        }

    } catch (error) {
        console.log(error.response.data);
    }
}

function* watchRemoveUserFromTask() {
    yield takeLatest(REMOVE_USER_FROM_TASK_API_SAGA, removeUserFromTask)
}


function* getUserByProjectId(action) {
    try {
        const { payload } = action;
        const { data, status } = yield call(() => ServiceUser.getUserByProjectId(payload));

        if (status === 200) {
            yield put(actionPushUserByProjectId(data.content));
        }

    } catch (error) {
        // console.log(error?.response?.data);
        yield put(actionPushUserByProjectId([]));
    }
}

function* watchGetUserByProjectId() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_API_SAGA, getUserByProjectId)
}


function* assignUserTask(action) {
    try {
        const userId = action.payload;

        const { currentTask } = yield select(state => state.stateTask);

        const newTask = { ...currentTask, listUserAsign: [...currentTask?.assigness.map(user => user.id), userId] }

        const { data, status } = yield call(() => ServiceTask.updateTaskApi(newTask));

        if (status === 200) {
            yield put(actionGetProjectDetailSaga(currentTask.projectId));
            yield put(actionGetTaskDetailApiSaga(currentTask.taskId));
        }

    } catch (error) {
        console.log(error.response.data);
    }
}

function* watchAssignUserTask() {
    yield takeLatest(ASSIGN_USER_TASK_API_SAGA, assignUserTask)
}

export {
    watchSignIn,
    watchGetUserByKeyWord,
    watchGetUserByProjectId,
    watchRemoveUserFromTask,
    watchAssignUserTask,
}