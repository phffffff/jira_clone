import { call, delay, put, takeLatest, select } from 'redux-saga/effects';

import { GET_TASK_TYPE_API, GET_STATUS_API, GET_PRIORITY_API, CREATE_TASK_API, UPDATE_TASK_API, DELETE_TASK_API, GET_TASK_DETAIL_API } from '../../constants/constantsApi'
import ServiceTask from '../../../services/ServiceTask';
import { actionSetStatus } from '../../actions/actionTask/actionStatus';
import { actionSetTaskDetail, actionSetTaskType, actionUpdateTaskDetail } from '../../actions/actionTask/actionTask';
import { actionSetPriority } from '../../actions/actionTask/actionPriority';
import { addLoading, removeLoading } from '../../actions/actionLoading/actionLoading';
import openNotificationWithIcon from '../../../utils/notificationfunc';
import { actionGetProjectDetailSaga } from '../../actions/actionProject/actionProjectApi';
import { actionGetTaskDetailApiSaga } from '../../actions/actionTask/actionTaskApi';

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
            openNotificationWithIcon('success', 'Success', 'Thêm thành công', 500);
            yield put(actionGetProjectDetailSaga(action.payload.projectId))
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

function* updateTaskApiSaga(action) {
    yield put(actionUpdateTaskDetail(action.payload));
    try {
        const { currentTask } = yield select(state => state.stateTask);

        const { data, status } = yield call(() => ServiceTask.updateTaskApi(currentTask));

        if (status === 200) {
            openNotificationWithIcon('success', "Success", "Sửa thành công", 500);

            yield put(actionSetTaskDetail(currentTask));

            yield put(actionGetProjectDetailSaga(data.content.projectId));
        }
    } catch (error) {
        openNotificationWithIcon('error', "Error", "Sửa thất bại", 500);
        console.log(error.response.data)
    }

}

function* watchUpdateTaskApiSaga() {
    yield takeLatest(UPDATE_TASK_API, updateTaskApiSaga);
}

function* deleteTaskApiSaga(action) {
    yield put(addLoading());

    yield delay(300);

    try {
        const { taskId, projectId } = action.payload

        const { data, status } = yield call(() => ServiceTask.deleteTaskApi(taskId));

        if (status === 200) {
            yield put(actionGetProjectDetailSaga(projectId))
            openNotificationWithIcon('success', "Success", "Xóa thành công", 500);
            console.log(data);
        }
    } catch (error) {
        openNotificationWithIcon('error', "Error", "Xóa thất bại", 500);
        console.log(error.response.data)
    }

    yield put(removeLoading());
}

function* watchDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApiSaga);
}

function* getTaskDetailApi(action) {
    try {
        const { data, status } = yield call(() => ServiceTask.getTaskDetail(action.payload));

        if (status === 200) {
            yield put(actionSetTaskDetail(data.content))
        }
    } catch (error) {
        console.log(error.response.data);
    }

}

function* watchGetTaskDetailApi() {
    yield takeLatest(GET_TASK_DETAIL_API, getTaskDetailApi);
}

export {
    watchGetTaskTypeApiSaga,
    watchGetStatusApiSaga,
    watchGetPriorityApiSaga,
    watchCreateTaskApiSaga,
    watchUpdateTaskApiSaga,
    watchDeleteTaskApi,
    watchGetTaskDetailApi,
}