import { SET_PROJECT_CATEGORY, SET_ALL_PROJECT } from '../../constants/constanst';

const initState = {
    projectCategoryList: [],
    projectList: [],
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PROJECT_CATEGORY:
            return {
                ...state,
                projectCategoryList: [...action.payload],
            }

        case SET_ALL_PROJECT:
            return {
                ...state,
                projectList: [...action.payload]
            }

        default:
            return { ...state }
    }
}

export default projectReducer;