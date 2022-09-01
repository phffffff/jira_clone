import { takeLatest, put, call, delay, select } from 'redux-saga/effects';

import { LOGIN_USER_API_SAGA, ADD_MENBER_WITH_KEYWORD_SAGA } from '../../constants/constantsApi'
import ServiceUser from '../../../services/ServiceUser';
import { addLoading, removeLoading } from '../../actions/actionLoading/actionLoading';
import { TOKEN, USER_LOGIN } from '../../../utils/constantsApi';
import { pushMenberAction, pushUserAction } from '../../actions/actionUser/actionUser';

function* signIn(action) {
    yield put(addLoading())

    yield delay(500)

    try {
        const { payload } = action
        const { data, status } = yield call(() => ServiceUser.userSignIn(payload));

        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put(pushUserAction(data.content))

        const navigate = yield select(state => state.stateNavigate.navigate);

        navigate('/home', {
            replace: true,
        })

    } catch (error) {
        alert(error.response.data.message);
    }
    yield put(removeLoading());
}

function* watchSignIn() {
    yield takeLatest(LOGIN_USER_API_SAGA, signIn)
}

function* getUserByKeyWord(action) {
    try {
        const { payload } = action;
        const { data, status } = yield call(() => ServiceUser.getUserWithKeyword(payload));

        if (status === 200) {
            yield put(pushMenberAction(data.content));
        }

    } catch (error) {
        console.log(error.response.data);
    }
}

function* watchGetUserByKeyWord() {
    yield takeLatest(ADD_MENBER_WITH_KEYWORD_SAGA, getUserByKeyWord)
}

export {
    watchSignIn,
    watchGetUserByKeyWord,
}