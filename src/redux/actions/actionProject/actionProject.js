import { SET_PROJECT_CATEGORY, SET_ALL_PROJECT } from '../../constants/constanst'

const actionSetProjectCategory = (payload) => {
    return {
        type: SET_PROJECT_CATEGORY,
        payload,
    }
}

const actionSetProject = (payload) => {
    return {
        type: SET_ALL_PROJECT,
        payload,
    }
}

export {
    actionSetProjectCategory,
    actionSetProject,
}