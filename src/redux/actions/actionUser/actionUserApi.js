import { LOGIN_USER_API_SAGA, ADD_MENBER_WITH_KEYWORD_SAGA } from '../../constants/constantsApi'

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

export {
    signInUserApi,
    addMenberWithKeyword,
}