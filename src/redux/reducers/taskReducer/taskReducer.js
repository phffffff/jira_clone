import { SET_TASK_TYPE } from "../../constants/constanst";

const initState = {
    taskTypeList: [],
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TASK_TYPE:
            return {
                ...state,
                taskTypeList: [...action.payload],
            };

        default:
            return { ...state };
    }
}

export default taskReducer;