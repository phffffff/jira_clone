import { PUSH_NAVIGATE } from "../../constants/constanst"

const actionNavigate = (payload) => {
    return {
        type: PUSH_NAVIGATE,
        payload,
    }
};

export {
    actionNavigate,
};
