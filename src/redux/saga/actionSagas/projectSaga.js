import { call, takeLatest, put } from 'redux-saga/effects'

import { GET_PROJECT_API } from '../../constants/constantsApi'

function* getProjectApi(action) {
    console.log(action.type)
}

function* watchGetProjectApi() {
    yield takeLatest(GET_PROJECT_API, getProjectApi);
}

export {
    watchGetProjectApi,
}