import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import { increment, decrement, incrementByAmount, decrementByAmount } from '@store/counterSlice';

// Can I use ES6's arrow function syntax with generators? => NO
// The function* statement (function keyword followed by an asterisk) defines a generator function.

const fetchRandomNumber = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Math.floor(Math.random() * 30));
		}, 1500);
	});
};

const addOneFunction = function* () {
	yield put(increment());
};

const subtractOneFunction = function* () {
	yield put(decrement());
};

const addByAmountFunction = function* (action) {
	console.log(action); // {type: 'ADDBYAMOUNT', data: 2}
	yield put(incrementByAmount(action.data));
};

const randomComputationFunction = function* (action) {
	yield call(action.setLoading, true); // true를 인자로 action.setLoading 호출
	const randomNumber1 = yield call(fetchRandomNumber);

	yield put(incrementByAmount(randomNumber1)); // 액션을 dispatch (loading 인데 숫자가 바뀌는 걸 볼 수 있음 [yield덕분])

	const randomNumber2 = yield call(fetchRandomNumber);

	yield delay(1000);

	yield put(decrementByAmount(randomNumber2));

	yield call(action.setLoading, false);
};

const addOne = function* () {
	yield takeLatest('ADDONE', addOneFunction);
};

const subtractOne = function* () {
	yield takeLatest('SUBTRACTONE', subtractOneFunction);
};

const addByAmount = function* () {
	yield takeLatest('ADDBYAMOUNT', addByAmountFunction);
};

const randomComputation = function* () {
	yield takeLatest('RANDOMCOMPUTATION', randomComputationFunction);
};

export default function* counterSaga() {
	yield all([fork(addOne), fork(subtractOne), fork(addByAmount), fork(randomComputation)]);
}
