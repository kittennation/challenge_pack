import { put, takeEvery, all, call } from 'redux-saga/effects'
import Axios from 'axios'

function* getBriefs() {
    try {
        const response = yield call(Axios.get, 'http://localhost:3001/briefs?_expand=product');
        const data = response.data;
        return data
    } catch(err) {
        return null
    }
}

function* getProducts(){
    try {
        const response = yield call(Axios.get, 'http://localhost:3001/products');
        const data = response.data;
        return data
    } catch(err) {
        return null
    }
}

function* loadBriefs() {
    let fetchRes = yield call(getBriefs)
    if (fetchRes !== null)
        yield put({type: 'brief/HYDRATE', payload: fetchRes})
}

function* loadProducts(){
    let fetchRes = yield call(getProducts)
    if(fetchRes !== null)
        yield put({type: 'product/HYDRATE', payload: fetchRes})
}

function* watchLoadBriefs() {
    yield takeEvery('brief/LOAD', loadBriefs)
}

function* watchLoadProducts() {
    yield takeEvery('product/LOAD', loadProducts)
}

export function* rootSaga() {
    yield all([
        watchLoadBriefs(),
        watchLoadProducts()
    ])
}