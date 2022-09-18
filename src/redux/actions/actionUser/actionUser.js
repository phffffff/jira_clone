import { PUSH_USER, PUSH_MEMBER, PUSH_USER_BY_PROJECTID } from "../../constants/constanst"

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

const actionPushUserByProjectId = (payload) => {
    return {
        type: PUSH_USER_BY_PROJECTID,
        payload,
    }
}

export {
    pushUserAction,
    pushMenberAction,
    actionPushUserByProjectId,
}