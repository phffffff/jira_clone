import { GET_PRIORITY_API } from '../../constants/constantsApi';

const actionGetPriorityApiSaga = () => {
    return {
        type: GET_PRIORITY_API,
    }
}

export {
    actionGetPriorityApiSaga,
}