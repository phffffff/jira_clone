import { PUSH_USER, PUSH_MEMBER } from "../../constants/constanst"

const pushUserAction = (payload) => {
    return {
        type: PUSH_USER,
        payload,
    }
}

const pushMenberAction = (payload) => {
    return {
        type: PUSH_MEMBER,
        payload,
    }
}

export {
    pushUserAction,
    pushMenberAction,
}