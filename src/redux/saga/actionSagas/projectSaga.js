import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import {
    GET_PROJECT_CATEGORY_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    GET_PROJECT_API_DATA,
} from '../../constants/constantsApi'
import ServiceProject from '../../../services/ServiceProject'
import { actionSetProjectCategory, actionSetProject } from '../../actions/actionProject/actionProject'
import { addLoading, removeLoading } from '../../actions/actionLoading/actionLoading';

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

function* setProjectApi() {
    yield put(addLoading())

    yield delay(500)
    try {
        const { data, status } = yield call(() => ServiceProject.getProject());
        if (status === 200) {
            yield put(actionSetProject(data.content));
        }
    } catch (error) {
        console.log(error.response.data);
    }

    yield put(removeLoading());
}

function* watchSetProjectApi() {
    yield takeLatest(GET_PROJECT_API_DATA, setProjectApi);
}

export {
    watchGetProjectCategoryApi,
    watchCreateProjectApi,
    watchSetProjectApi,
}
