import { SET_TASK_TYPE } from '../../constants/constanst';

const actionSetTaskType = (payload) => {
    return {
        type: SET_TASK_TYPE,
        payload: payload
    }
}

export {
    actionSetTaskType,
}