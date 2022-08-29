import { LOGIN_USER_API } from '../../constants/constantsApi'

const signInUserApi = (payload) => {
    return {
        type: LOGIN_USER_API,
        payload
    }
}

export {
    signInUserApi,
}