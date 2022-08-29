import { ADD_LOADING, REMOVE_LOADING } from "../../constants/constanst";

const initState = {
    isLoading: false,
}

const loadReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_LOADING:
            return {
                ...state,
                isLoading: false
            }

        default:
            return { ...state }
    }
}

export default loadReducer;