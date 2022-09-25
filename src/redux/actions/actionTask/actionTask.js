import { RESET_TASK_FORM, SET_TASK_TYPE, SET_TASK_DETAIL, UPDATE_TASK_DETAIL } from '../../constants/constanst';

const actionSetTaskType = (payload) => {
    return {
        type: SET_TASK_TYPE,
        payload: payload
    }
}

const actionResetTaskForm = () => {
    return {
        type: RESET_TASK_FORM,
    }
}

const actionSetTaskDetail = (payload) => {
    return {
        type: SET_TASK_DETAIL,
        payload,
    }
}

const actionUpdateTaskDetail = (payload) => {
    return {
        type: UPDATE_TASK_DETAIL,
        payload,
    }
}


export {
    actionSetTaskType,
    actionResetTaskForm,
    actionSetTaskDetail,
    actionUpdateTaskDetail,
}