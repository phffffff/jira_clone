import { GET_TASK_TYPE_API, CREATE_TASK_API } from '../../constants/constantsApi'

const actionGetTaskTypeApiSaga = () => {
    return {
        type: GET_TASK_TYPE_API,
    }
}

const actionCreateTastApiSaga = (payload) => {
    return {
        type: CREATE_TASK_API,
        payload,
    }
}

export {
    actionGetTaskTypeApiSaga,
    actionCreateTastApiSaga,
}