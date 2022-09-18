import { LOGIN_USER_API_SAGA, ADD_MENBER_WITH_KEYWORD_SAGA, GET_USER_BY_PROJECT_ID_API_SAGA } from '../../constants/constantsApi'

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

export {
    signInUserApi,
    addMenberWithKeyword,
    actionGetUserByProjectIdApiSaga,
}