import { GET_STATUS_API } from '../../constants/constantsApi';

const actionGetStatusApiSaga = () => {
    return {
        type: GET_STATUS_API,
    }
}

export {
    actionGetStatusApiSaga,
}