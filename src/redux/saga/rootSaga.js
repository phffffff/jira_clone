import { all } from 'redux-saga/effects'

import * as User from './actionSagas/userSaga'

function* rootSaga() {
    yield all([
        //UserSaga
        User.watchSignIn()
    ])
}

export default rootSaga;