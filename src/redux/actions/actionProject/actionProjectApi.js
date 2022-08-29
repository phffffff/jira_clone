import { GET_PROJECT_API } from '../../constants/constantsApi'
const actionGetProject = () => {
    return {
        type: GET_PROJECT_API,
    }
}

export {
    actionGetProject
};