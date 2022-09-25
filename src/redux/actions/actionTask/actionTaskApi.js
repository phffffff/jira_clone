import { GET_TASK_TYPE_API, CREATE_TASK_API, UPDATE_TASK_API, DELETE_TASK_API, GET_TASK_DETAIL_API } from '../../constants/constantsApi'

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

const actionUpdateTaskApiSaga = (payload) => {
    return {
        type: UPDATE_TASK_API,
        payload,
    }
}

const actionDeleteTaskApiSaga = (payload) => {
    return {
        type: DELETE_TASK_API,
        payload,
    }
}

const actionGetTaskDetailApiSaga = (payload) => {
    return {
        type: GET_TASK_DETAIL_API,
        payload,
    }
}

export {
    actionGetTaskTypeApiSaga,
    actionCreateTastApiSaga,
    actionUpdateTaskApiSaga,
    actionDeleteTaskApiSaga,
    actionGetTaskDetailApiSaga,
}