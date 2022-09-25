import { LOGIN_USER_API_SAGA, ADD_MENBER_WITH_KEYWORD_SAGA, GET_USER_BY_PROJECT_ID_API_SAGA, REMOVE_USER_FROM_TASK_API_SAGA, ASSIGN_USER_TASK_API_SAGA } from '../../constants/constantsApi'

const signInUserApi = (payload) => {
    return {
        type: LOGIN_USER_API_SAGA,
        payload
    }
}

const addMenberWithKeyword = (payload) => {
    return {
        type: ADD_MENBER_WITH_KEYWORD_SAGA,
        payload
    }
}

const actionGetUserByProjectIdApiSaga = (payload) => {
    return {
        type: GET_USER_BY_PROJECT_ID_API_SAGA,
        payload,
    }
}

const actionRemoveUserFromTaskApiSaga = (payload) => {
    return {
        type: REMOVE_USER_FROM_TASK_API_SAGA,
        payload,
    }
}

const actionAssignUserTaskApiSaga = (payload) => {
    return {
        type: ASSIGN_USER_TASK_API_SAGA,
        payload,
    }
}

export {
    signInUserApi,
    addMenberWithKeyword,
    actionGetUserByProjectIdApiSaga,
    actionRemoveUserFromTaskApiSaga,
    actionAssignUserTaskApiSaga,
}