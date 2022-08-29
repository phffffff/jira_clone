import { GET_PROJECT_API } from '../../constants/constantsApi'

const initState = {
    projectList: [],
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PROJECT_API:

            return { ...state }

        default:
            return { ...state }
    }
}

export default projectReducer;