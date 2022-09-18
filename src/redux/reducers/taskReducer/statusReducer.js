import { SET_STATUS } from "../../constants/constanst";

const initState = {
    statusList: [],
}

const statusReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                statusList: [...action.payload],
            };

        default:
            return { ...state };
    }
}

export default statusReducer;