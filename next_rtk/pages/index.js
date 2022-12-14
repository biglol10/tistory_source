import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import styles from '../styles/Home.module.css';

export default function Home() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [idValue, setIdValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		const userObj = {
			userId: idValue,
			password: passwordValue,
		};

		localStorage.setItem('userInfo', JSON.stringify(userObj));

		dispatch({
			type: 'SETUSER',
			param: userObj,
			callbackFn: (tokenValue) => {
				localStorage.setItem('token', tokenValue);
				router.push('/welcome');
			},
		});
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '500px',
					flexDirection: 'column',
				}}
			>
				<h1>로그인 해주세요</h1>
				<br />
				<form onSubmit={handleSubmit}>
					<label htmlFor="inputId">아이디</label>
					<input
						id="inputId"
						value={idValue}
						onChange={(e) => setIdValue(e.target.value)}
					/>
					<br />
					<label htmlFor="password">비밀번호</label>
					<input
						id="password"
						value={passwordValue}
						onChange={(e) => setPasswordValue(e.target.value)}
					/>
					<br />
					<button type="submit">로그인</button>
				</form>
			</div>
		</div>
	);
}
