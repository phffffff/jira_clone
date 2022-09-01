import {
    GET_PROJECT_CATEGORY_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    GET_PROJECT_API_SAGA,
    DEL_PROJECT_API_SAGA,
    PUT_PROJECT_API_SAGA,
    ASSIGN_USER_PROJECT,
    REMOVE_USER_FROM_PROJECT,
    GET_PROJECT_DETAIL_API,
} from '../../constants/constantsApi'

const actionGetProjectCategoryApiSaga = () => {
    return {
        type: GET_PROJECT_CATEGORY_API_SAGA,
    }
}

const actionCreateProjectApiSaga = (payload) => {
    return {
        type: CREATE_PROJECT_API_SAGA,
        payload,
    }
}

const actionGetProjectApiSaga = () => {
    return {
        type: GET_PROJECT_API_SAGA,
    }
}

const actionPutProjectApiSaga = (payload) => {
    return {
        type: PUT_PROJECT_API_SAGA,
        payload,
    }
}

const actionDelProjectApiSaga = (payload) => {
    return {
        type: DEL_PROJECT_API_SAGA,
        payload,
    }
}

const actionAssignUserProjectSaga = (payload) => {
    return {
        type: ASSIGN_USER_PROJECT,
        payload,
    }
}

const actionRemoveUserFromProjectSaga = (payload) => {
    return {
        type: REMOVE_USER_FROM_PROJECT,
        payload,
    }
}

const actionGetProjectDetailSaga = (payload) => {
    return {
        type: GET_PROJECT_DETAIL_API,
        payload,
    }
}

export {
    actionGetProjectCategoryApiSaga,
    actionCreateProjectApiSaga,
    actionGetProjectApiSaga,
    actionDelProjectApiSaga,
    actionPutProjectApiSaga,
    actionAssignUserProjectSaga,
    actionRemoveUserFromProjectSaga,
    actionGetProjectDetailSaga,
}