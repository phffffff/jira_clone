import { ADD_LOADING, REMOVE_LOADING } from '../../constants/constanst'

const addLoading = () => {
    return {
        type: ADD_LOADING,
    }
}

const removeLoading = () => {
    return {
        type: REMOVE_LOADING,
    }
}

export {
    addLoading,
    removeLoading,
};