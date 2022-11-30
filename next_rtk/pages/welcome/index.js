import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
	const dispatch = useDispatch();
	const userObj = useSelector((state) => state.user);
	const countValue = useSelector((state) => state.counter.count);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState(0);

	const changeCountValue = (isUp = true) => {
		dispatch({
			type: `${isUp ? 'ADDONE' : 'SUBTRACTONE'}`,
		});
	};

	const changeByAmount = (num) => {
		try {
			dispatch({
				type: 'ADDBYAMOUNT',
				data: parseInt(num, 10),
			});
		} catch (err) {
			console.log('err');
		}
	};

	const changeByRandom = () => {
		dispatch({
			type: 'RANDOMCOMPUTATION',
			setLoading,
		});
	};

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '500px',
				flexDirection: 'column',
			}}
		>
			<h1>Hello {userObj.userId} try to use counter example</h1>

			<br />

			{loading && <h1 style={{ color: 'red' }}>it is loading right now!!!!</h1>}

			<div style={{ width: '200px', height: '200px', border: '1px solid blue' }}>
				current count is : {countValue}
			</div>

			<br />

			<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

			<br />

			<div style={{ display: 'flex' }}>
				<button onClick={() => changeCountValue(true)}>up</button>
				<button onClick={() => changeCountValue(false)}>down</button>
				<button onClick={() => changeByAmount(inputValue)}>숫자만큼 더하기</button>
				<button onClick={() => changeByRandom()}>랜덤숫자 더하기</button>
			</div>
		</div>
	);
};

export default Index;
