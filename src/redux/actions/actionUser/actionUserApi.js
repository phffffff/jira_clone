import { LOGIN_USER_API_SAGA } from '../../constants/constantsApi'

const signInUserApi = (payload) => {
    return {
        type: LOGIN_USER_API_SAGA,
        payload
    }
}

export {
    signInUserApi,
}