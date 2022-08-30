import {
    GET_PROJECT_CATEGORY_API_SAGA,
    CREATE_PROJECT_API_SAGA,
    GET_PROJECT_API_DATA,
} from '../../constants/constantsApi'

const actionGetProjectCategoryApiSaga = () => {
    return {
        type: GET_PROJECT_CATEGORY_API_SAGA,
    }
}

const actionCreateProjectApiSaga = (payload) => {
    return {
        type: CREATE_PROJECT_API_SAGA,
        payload,
    }
}

const actionGetProjectApiSaga = () => {
    return {
        type: GET_PROJECT_API_DATA,
    }
}

export {
    actionGetProjectCategoryApiSaga,
    actionCreateProjectApiSaga,
    actionGetProjectApiSaga,
}