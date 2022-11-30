import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper'; // nextjs friendly
import createSagaMiddleware from 'redux-saga';

import rootSaga from '@saga/index';
import counterSlice from './counterSlice';
import userSlice from './userSlice';

const devMode = process.env.NODE_ENV === 'development';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE: {
			const nextState = {
				...state, // use previous state
				...action.payload,
			};

			return nextState;
		}
		default: {
			const combineReducer = combineReducers({
				counter: counterSlice,
				user: userSlice,
			});

			return combineReducer(state, action);
		}
	}
};

const loggerMiddleware = // console.log를 위한 custom middleware
	() => (next) => (action) => {
		console.log(action);
		return next(action);
	};

const sagaMiddleware = createSagaMiddleware();
const devMiddleware = [sagaMiddleware, loggerMiddleware];

const finalMiddleware = process.env.NODE_ENV === 'development' ? devMiddleware : sagaMiddleware;

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// async Saga를 위해 resolve, reject를 반환해서 에러가 생기는 이슈로,
			// serializableCheck 미들웨어를 사용안함
			thunk: false,
			serializableCheck: false,
		}).concat(finalMiddleware),
	devTools: devMode, // redux devtools 확장 프로그램 사용 가능여부
});

store.sagaTask = sagaMiddleware.run(rootSaga);

const wrapper = createWrapper(() => store, { debug: devMode });

export default wrapper;
