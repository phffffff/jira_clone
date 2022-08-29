import { PUSH_NAVIGATE } from '../../constants/constanst'

const initState = {
    navigate: '',
}

const navigateReducer = (state = initState, action) => {
    switch (action.type) {
        case PUSH_NAVIGATE:
            return {
                ...state,
                navigate: action.payload,
            }
        default:
            return { ...state };
    }
};

export default navigateReducer;
