import { USER_LOGIN } from "../../../utils/constantsApi";
import { PUSH_USER } from "../../constants/constanst";

const userStore = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : null;

const initState = {
    user: userStore
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case PUSH_USER:
            const { payload } = action
            console.log(payload);
            console.log(userStore);
            return {
                ...state,
                user: payload,
            }
        default:
            return { ...state }
    }
};

export default userReducer;