import { SET_PRIORITY } from "../../constants/constanst"

const initState = {
    priorityList: [],
}

const priorityReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PRIORITY:
            return {
                ...state,
                priorityList: [...action.payload],
            };
        default:
            return { ...state };
    }
}

export default priorityReducer;