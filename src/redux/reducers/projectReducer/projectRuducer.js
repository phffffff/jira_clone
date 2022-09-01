import {
    SET_PROJECT_CATEGORY,
    SET_ALL_PROJECTS,
    SET_PROJECT,
    SET_PROJECT_DETAIL
} from '../../constants/constanst';

const initState = {
    projectCategoryList: [],
    projectList: [],
    projectEdit: {
        id: '',
        projectName: '',
        creator: '',
        description: '',
        categoryId: '',
    },
    projectDetail: {},
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PROJECT_CATEGORY:
            return {
                ...state,
                projectCategoryList: [...action.payload],
            }

        case SET_ALL_PROJECTS:
            return {
                ...state,
                projectList: [...action.payload]
            }
        case SET_PROJECT:
            let { payload } = action;
            const projectEdit = {
                id: payload.id,
                projectName: payload.projectName,
                creator: payload.creator.id,
                description: payload.description,
                categoryId: payload.categoryId,
            }
            return {
                ...state,
                projectEdit: {
                    ...projectEdit
                }
            }
        case SET_PROJECT_DETAIL:
            return {
                ...state,
                projectDetail: { ...action.payload },
            }
        default:
            return { ...state }
    }
}

export default projectReducer;