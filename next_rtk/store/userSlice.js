import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: '',
	password: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.userId = action.payload.userId;
			state.password = action.payload.password;
		},
		clearUser(state) {
			state.userId = '';
			state.password = '';
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
