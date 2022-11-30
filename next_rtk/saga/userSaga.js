import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { setUser, clearUser } from '@store/userSlice';

const setUserFunc = function* ({ param, callbackFn }) {
	const { userId, password } = param;

	yield put(
		setUser({
			userId,
			password,
		}),
	);

	if (callbackFn) yield call(callbackFn, 'tokenValue_aw32j9973');
};

const clearUserFunc = function* () {
	yield put(clearUser());
};

const setUserDispatch = function* () {
	yield takeLatest('SETUSER', setUserFunc);
};

const clearUserDispatch = function* () {
	yield takeLatest('CLEARUSER', clearUserFunc);
};

export default function* userSaga() {
	yield all([fork(setUserDispatch), fork(clearUserDispatch)]);
}
