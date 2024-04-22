import { createSlice } from '@reduxjs/toolkit'
import { baseValues, Role } from '../../util/enums'
import { logIn, logOut, refreshUser, register } from './authOperations'
import { setAuthHeader } from '../../util/axios'

const initialState = {
	user: {
		firstName: '',
		lastName: '',
		email: '',
		profilePictureUrl: baseValues.UserLogo,
		role: Role.Admin,
		dateOfBirth: Date.now(),
	},
	isLoggedIn: false,
	isRefreshing: true,
	token: '',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn(state, action) {
			state.isLoggedIn = action.payload
		},
		setToken(state, action) {
			state.token = action.payload
			setAuthHeader(action.payload)
		},
		setUser(state, action) {
			state.user = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.user = {
					...action.payload.user,
				}
				state.token = action.payload.token
				state.isLoggedIn = true
			})
			.addCase(logIn.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.token = action.payload.token
				state.isLoggedIn = true
			})
			.addCase(refreshUser.pending, state => {
				state.isRefreshing = true
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.isLoggedIn = true
				state.isRefreshing = false
			})
			.addCase(refreshUser.rejected, state => {
				state.isRefreshing = false
			})
			.addCase(logOut.fulfilled, (state, action) => {
				state.user = initialState.user
				state.isLoggedIn = false
			})
	},
})

export const { setIsLoggedIn, setUser, setToken } = authSlice.actions
export const authReducer = authSlice.reducer
