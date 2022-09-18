import { USER_LOGIN } from "../../../utils/constantsApi";
import { PUSH_USER, PUSH_MEMBER, PUSH_USER_BY_PROJECTID } from "../../constants/constanst";

const userStore = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : null;

const initState = {
    user: userStore,
    storeMenberAdd: [],
    userListByProjectId: [],
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case PUSH_USER:
            return {
                ...state,
                user: { ...action.payload },
            }
        case PUSH_MEMBER:
            return {
                ...state,
                storeMenberAdd: [...action.payload],
            }
        case PUSH_USER_BY_PROJECTID:
            return {
                ...state,
                userListByProjectId: [...action.payload],
            }
        default:
            return { ...state }
    }
};

export default userReducer;