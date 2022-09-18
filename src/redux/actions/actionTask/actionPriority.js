import { SET_PRIORITY } from "../../constants/constanst";

const actionSetPriority = (payload) => {
    return {
        type: SET_PRIORITY,
        payload,
    }
}

export {
    actionSetPriority,
}