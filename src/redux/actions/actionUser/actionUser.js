import { PUSH_USER } from "../../constants/constanst"

const pushUserAction = (payload) => {
    return {
        type: PUSH_USER,
        payload,
    }
}

export {
    pushUserAction,
}