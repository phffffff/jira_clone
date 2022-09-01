import { USER_LOGIN } from "../../../utils/constantsApi";
import { PUSH_USER, PUSH_MEMBER } from "../../constants/constanst";

const userStore = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : null;

const initState = {
    user: userStore,
    storeMenberAdd: [],
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case PUSH_USER:

            return {
                ...state,
                user: action.payload,
            }
        case PUSH_MEMBER:
            return {
                ...state,
                storeMenberAdd: action.payload,
            }
        default:
            return { ...state }
    }
};

export default userReducer;