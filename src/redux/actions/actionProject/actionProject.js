import { SET_PROJECT_CATEGORY, SET_ALL_PROJECTS, SET_PROJECT, SET_PROJECT_DETAIL } from '../../constants/constanst'

const actionSetProjectCategory = (payload) => {
    return {
        type: SET_PROJECT_CATEGORY,
        payload,
    }
}

const actionSetProjects = (payload) => {
    return {
        type: SET_ALL_PROJECTS,
        payload,
    }
}

const actionSetProject = (payload) => {
    return {
        type: SET_PROJECT,
        payload,
    }
}

const actionSetProjectDetail = (payload) => {
    return {
        type: SET_PROJECT_DETAIL,
        payload,
    }
}


export {
    actionSetProjectCategory,
    actionSetProjects,
    actionSetProject,
    actionSetProjectDetail,
}