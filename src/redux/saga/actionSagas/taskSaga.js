import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { GET_TASK_TYPE_API, GET_STATUS_API, GET_PRIORITY_API, CREATE_TASK_API } from '../../constants/constantsApi'
import ServiceTask from '../../../services/ServiceTask';
import { actionSetStatus } from '../../actions/actionTask/actionStatus';
import { actionSetTaskType } from '../../actions/actionTask/actionTask';
import { actionSetPriority } from '../../actions/actionTask/actionPriority';
import { addLoading, removeLoading } from '../../actions/actionLoading/actionLoading';
import openNotificationWithIcon from '../../../utils/notificationfunc';

function* getTaskTypeApiSaga(action) {
    try {
        const { data, status } = yield call(() => ServiceTask.getTaskTypeApi());

        if (status === 200) {
            yield put(actionSetTaskType(data.content))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchGetTaskTypeApiSaga() {
    yield takeLatest(GET_TASK_TYPE_API, getTaskTypeApiSaga);
}


function* getPriorityApiSaga(action) {
    try {
        const { data, status } = yield call(() => ServiceTask.getPriorityApi());

        if (status === 200) {
            yield put(actionSetPriority(data.content))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchGetPriorityApiSaga() {
    yield takeLatest(GET_PRIORITY_API, getPriorityApiSaga);
}


function* getStatusApiSaga(action) {
    try {
        const { data, status } = yield call(() => ServiceTask.getStatusApi());

        if (status === 200) {
            yield put(actionSetStatus(data.content))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchGetStatusApiSaga() {
    yield takeLatest(GET_STATUS_API, getStatusApiSaga);
}


function* createTaskApiSaga(action) {
    yield put(addLoading())

    yield delay(500)

    try {
        const { data, status } = yield call(() => ServiceTask.createTaskApi(action.payload));

        if (status === 200) {
            openNotificationWithIcon('success', 'Success', 'Thêm thành công', 500)
        }
    } catch (error) {
        console.log(error.response.data)
        openNotificationWithIcon('error', 'Error', 'Thêm thất bại', 500)
    }

    yield put(removeLoading());
}

function* watchCreateTaskApiSaga() {
    yield takeLatest(CREATE_TASK_API, createTaskApiSaga);
}

export {
    watchGetTaskTypeApiSaga,
    watchGetStatusApiSaga,
    watchGetPriorityApiSaga,
    watchCreateTaskApiSaga,
}