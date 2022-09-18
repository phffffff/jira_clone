import { SET_STATUS } from "../../constants/constanst";

const actionSetStatus = (payload) => {
    return {
        type: SET_STATUS,
        payload: payload,
    }
}

export {
    actionSetStatus,
}