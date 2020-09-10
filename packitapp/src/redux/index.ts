import { combineReducers } from 'redux'
import { productReducer } from './modules/product'
import { briefReducer } from './modules/brief'

export const rootReducer = combineReducers({
    product: productReducer,
    brief: briefReducer
});

export type RootState = ReturnType<typeof rootReducer>;