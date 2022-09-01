import React from "react";

import { CLOSE_DRAWER, OPEN_DRAWER, SET_HANDLE_SUBMIT } from '../../constants/constanst'

const initState = {
    componentForm: <p>Form Default</p>,
    title: 'Form default',
    isOpen: false,
    handleSubmit: () => alert("Default"),
}

const formReducer = (state = initState, action) => {
    switch (action.type) {
        case CLOSE_DRAWER:
            return {
                ...state,
                isOpen: false,
            }

        case OPEN_DRAWER:
            const newForm = {
                componentForm: action.payload,
                isOpen: true,
                title: 'Form Editer',
            }
            return {
                ...state,
                ...newForm,
            }
        case SET_HANDLE_SUBMIT:
            return {
                ...state,
                handleSubmit: action.payload,
            }
        default:
            return { ...state };
    }
}

export default formReducer;
