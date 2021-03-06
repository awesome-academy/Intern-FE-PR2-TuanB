import { call, put, delay, takeEvery } from 'redux-saga/effects';
import authorAPI from '../../api/authorAPI';
import { hiddenLoading, showLoading } from '../../components/Loading/lodingSlice';
import { FETCH_DATA_SUCCESS } from '../../constants';
import { getStatus, getDataUser, getValueLogin, getUser, getHistory, getAllHistory, getRegister, registerSuccess } from './authorSlice';

function* trackingLoginSuccess(value) {
    yield put(showLoading())
    const data = yield call(authorAPI.getToken, value.payload)
    if (data.statusCode === FETCH_DATA_SUCCESS) {
        yield localStorage.setItem('token', data.data.token)
        yield put(getDataUser(data.data.user))
        yield put(getStatus(data.statusCode))
    } else {
        yield put(getStatus(data.statusCode))
    }
    yield delay(300)
    yield put(hiddenLoading())
}

function* trackingGetUser() {
    yield put(showLoading())
    const data = yield call(authorAPI.getUSer)
    if (data.statusCode === FETCH_DATA_SUCCESS) {
        yield put(getDataUser(data.data))
        yield put(getStatus(data.statusCode))
    } else {
        yield put(getStatus(data.statusCode))
    }
    yield delay(300)
    yield put(hiddenLoading())
}

function* trackingGetHistory() {
    yield put(showLoading())
    const data = yield call(authorAPI.getHistory)
    if (data.statusCode === FETCH_DATA_SUCCESS) {
        yield put(getAllHistory(data.data))
    } else {
        yield put(getStatus(data.statusCode))
    }
    yield delay(300)
    yield put(hiddenLoading())
}

function* trackingRegisterSuccess(action) {
    yield put(showLoading())
    const data = yield call(authorAPI.getRegister, action.payload)
    if (data.statusCode === FETCH_DATA_SUCCESS) {
        yield put(registerSuccess(data.statusCode))
    } else {
        yield put(registerSuccess(data.statusCode))
    }
    yield delay(300)
    yield put(hiddenLoading())
}

function* authorSaga() {
    yield takeEvery(getValueLogin, trackingLoginSuccess)
    yield takeEvery(getUser, trackingGetUser)
    yield takeEvery(getHistory, trackingGetHistory)
    yield takeEvery(getRegister, trackingRegisterSuccess)
}

export default authorSaga
