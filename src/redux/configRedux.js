import { applyMiddleware, createStore } from 'redux'
import createMiddleWareSaga from 'redux-saga'

import rootReducer from './reducers/rootReducer'
import rootSaga from './saga/rootSaga'

const middleWareSaga = createMiddleWareSaga();

const store = createStore(rootReducer, applyMiddleware(middleWareSaga))

middleWareSaga.run(rootSaga);

export default store;