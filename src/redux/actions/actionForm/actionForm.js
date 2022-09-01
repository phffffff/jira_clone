import React from 'react'

import { OPEN_DRAWER, CLOSE_DRAWER, SET_HANDLE_SUBMIT } from '../../constants/constanst'

const actionOpenDrawer = (payload) => {
    return {
        type: OPEN_DRAWER,
        payload,
    }
}

const actionCloseDrawer = () => {
    return {
        type: CLOSE_DRAWER,
    }
}

const actionSetHandleSubmit = (payload) => {
    return {
        type: SET_HANDLE_SUBMIT,
        payload,
    }
}

export {
    actionOpenDrawer,
    actionCloseDrawer,
    actionSetHandleSubmit,
}
