import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productReducer } from './modules/product'
import { briefReducer } from './modules/brief'

import { rootSaga } from './modules/watcher'

export const rootReducer = combineReducers({
    product: productReducer,
    brief: briefReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const init : RootState = {
    product: { products: []},
    brief: { briefs: [], filter: 0}
  }

export const store = (initialState: RootState = init) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware]

    return {
        ...createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))),
        runSaga: sagaMiddleware.run(rootSaga)
    };
}