import { Statistic } from "antd";
import React from "react";

import { CLOSE_DRAWER, OPEN_DRAWER, SET_HANDLE_SUBMIT } from '../../constants/constanst'

const initState = {
    componentForm: <p>Form Default</p>,
    title: 'Form default',
    isOpen: false,
    handleSubmit: () => alert("Default"),
    handleReset: () => alert("Reset"),
}

const formReducer = (state = initState, action) => {
    switch (action.type) {
        case CLOSE_DRAWER:
            // state.handleReset();
            return {
                ...state,
                isOpen: false,
            }

        case OPEN_DRAWER:
            const newForm = {
                componentForm: action.payload.component,
                isOpen: true,
                title: action.payload.title,
            }
            return {
                ...state,
                ...newForm,
            }
        case SET_HANDLE_SUBMIT:
            return {
                ...state,
                handleSubmit: action.payload.handleSubmit,
                handleReset: action.payload.handleReset,
            }
        default:
            return { ...state };
    }
}

export default formReducer;
