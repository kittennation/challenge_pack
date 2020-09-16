import { put, takeEvery, all, call } from 'redux-saga/effects'
import Axios from 'axios'

function* getBriefs() {
    try {
        const response = yield call(Axios.get, 'http://localhost:3001/briefs?_expand=product');
        const data = response.data;
        console.log("Watcher :", data);
        return data
    } catch(err) {
        console.log("Watcher Error :", err);
        return null
    }
}

function* loadBriefs() {
    let fetchRes = yield call(getBriefs)
    if (fetchRes !== null)
        yield put({type: 'brief/HYDRATE', payload: fetchRes})
}

function* watchLoadBriefs() {
    yield takeEvery('brief/SUCCESS', loadBriefs)
}

export function* rootSaga() {
    yield all([
        watchLoadBriefs()
    ])
}