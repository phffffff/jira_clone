import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import {
    GET_PROJECT_CATEGORY_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    GET_PROJECT_API_SAGA,
    PUT_PROJECT_API_SAGA,
    DEL_PROJECT_API_SAGA,
    ASSIGN_USER_PROJECT,
    REMOVE_USER_FROM_PROJECT,
    GET_PROJECT_DETAIL_API,
} from '../../constants/constantsApi'
import ServiceProject from '../../../services/ServiceProject'
import { actionSetProjectCategory, actionSetProjectDetail, actionSetProjects } from '../../actions/actionProject/actionProject'
import { addLoading, removeLoading } from '../../actions/actionLoading/actionLoading';
import { actionCloseDrawer } from '../../actions/actionForm/actionForm';
import { actionGetProjectApiSaga } from '../../actions/actionProject/actionProjectApi';
import openNotificationWithIcon from '../../../utils/notificationfunc';

function* getProjectCategoryApi() {
    try {
        const { data, status } = yield call(() => ServiceProject.getProjectCategory());

        if (status === 200) {
            yield put(actionSetProjectCategory(data.content))
        }

    } catch (error) {
        console.log(error.response.message)
    }
}

function* watchGetProjectCategoryApi() {
    yield takeLatest(GET_PROJECT_CATEGORY_API_SAGA, getProjectCategoryApi);
}

function* createProjectApi(action) {
    try {
        const project = action.payload;
        const { data, status } = yield call(() => ServiceProject.createProject(project));

        if (status === 200) {
            alert("Thêm thành công");
            console.log(data)

            const navigate = yield select(state => state.stateNavigate.navigate);

            navigate('/ListProject', {
                replace: true,
            })
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

function* watchCreateProjectApi() {
    yield takeLatest(CREATE_PROJECT_API_SAGA, createProjectApi);
}

function* setProjectsApi() {
    yield put(addLoading())

    yield delay(500)
    try {
        const { data, status } = yield call(() => ServiceProject.getProject());
        if (status === 200) {
            yield put(actionSetProjects(data.content));
        }
    } catch (error) {
        console.log(error.response.data);
    }

    yield put(removeLoading());
}

function* watchSetProjectApi() {
    yield takeLatest(GET_PROJECT_API_SAGA, setProjectsApi);
}

function* editProjectApi(action) {
    yield put(addLoading())

    yield delay(300)
    try {
        const { data, status } = yield call(() => ServiceProject.editProject(action.payload));
        if (status === 200) {
            yield put(actionGetProjectApiSaga())
            yield put(actionCloseDrawer());
        }
    } catch (error) {
        console.log(error.response.data);
    }

    yield put(removeLoading());
}

function* watchEditProjectApi() {
    yield takeLatest(PUT_PROJECT_API_SAGA, editProjectApi);
}


function* delProjectApi(action) {
    yield put(addLoading());

    yield delay(300)

    try {
        const { data, status } = yield call(() => ServiceProject.delProject(action.payload))
        if (status === 200) {
            yield put(actionGetProjectApiSaga())

            openNotificationWithIcon('success', <i>Success</i>, 'Xóa thành công!', 2.0);

        }
    } catch (error) {
        console.log(error.response.data)
        openNotificationWithIcon('error', 'Error', 'Xóa không thành công!');
    }

    yield put(removeLoading());
}

function* watchDelProjectApi() {
    yield takeLatest(DEL_PROJECT_API_SAGA, delProjectApi);
}


function* assignUserProjectApi(action) {
    try {
        const { data, status } = yield call(() => ServiceProject.assignUserProject(action.payload))
        if (status === 200) {
            yield put(actionGetProjectApiSaga());
            setTimeout(() => {
                openNotificationWithIcon('success', <i>Success</i>, 'Thêm thành công!', 2.0);
            }, 100);
        }
    } catch (error) {
        console.log(error.response.data)
        openNotificationWithIcon('error', 'Error', 'Không đủ quyền hoặc người dùng đã được thêm vào trước đó!');
    }
}

function* watchAssignUserProjectApi() {
    yield takeLatest(ASSIGN_USER_PROJECT, assignUserProjectApi);
}


function* removeUserFromProjectApi(action) {
    try {
        const { status } = yield call(() => ServiceProject.removeUserFromProject(action.payload))
        if (status === 200) {
            yield put(actionGetProjectApiSaga());
        }
    } catch (error) {
        console.log(error.response.data)
        openNotificationWithIcon('error', 'Error', 'Không đủ quyền!');
    }
}

function* watchRemoveUserFromProjectApi() {
    yield takeLatest(REMOVE_USER_FROM_PROJECT, removeUserFromProjectApi);
}

function* getProjectDetailApi(action) {
    try {
        const { data, status } = yield call(() => ServiceProject.getProjectDetail(action.payload));
        if (status === 200) {
            yield put(actionSetProjectDetail(data.content));
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchGetProjectDetailApi() {
    yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailApi)
}

export {
    watchGetProjectCategoryApi,
    watchCreateProjectApi,
    watchSetProjectApi,
    watchEditProjectApi,
    watchDelProjectApi,
    watchAssignUserProjectApi,
    watchRemoveUserFromProjectApi,
    watchGetProjectDetailApi,
}
