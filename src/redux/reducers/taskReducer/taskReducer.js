import { RESET_TASK_FORM, SET_TASK_DETAIL, SET_TASK_TYPE, UPDATE_TASK_DETAIL } from "../../constants/constanst";

const initState = {
    taskTypeList: [],
    currentTask: {
        listUserAssign: [],
    },
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TASK_TYPE:
            return {
                ...state,
                taskTypeList: [...action.payload],
            };

        case RESET_TASK_FORM:
            return {
                ...state,
                currentTask: {},
            }

        case SET_TASK_DETAIL:
            return {
                ...state,
                currentTask: {
                    ...action.payload,
                    listUserAssign: [...action.payload?.assigness.map(user => user.id)]
                },
            }

        case UPDATE_TASK_DETAIL:
            const { payload } = action;
            const { name, value } = payload;

            return {
                ...state,
                currentTask: {
                    ...state.currentTask,
                    [name]: value,
                },
            }
        default:
            return { ...state };
    }
}

export default taskReducer;