import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import rootReducer from 'store/reducer';
import rootSaga from 'store/saga';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);

export const store = createStore(rootReducer, middleware);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
