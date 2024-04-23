import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance, clearAuthHeader, setAuthHeader } from '../../util/axios'
import { RootState } from '../store'
import { useDispatch } from 'react-redux'
import { getUserById } from '../../util/responsesToDB'
import { toast } from 'react-toastify'

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
	'auth/register',
	async (
		userData,
		// {
		// 	firstName: String
		// 	lastName: String
		// 	email: String
		// 	hashPassword: String
		// }
		thunkAPI
	) => {
		try {
			const res = await axiosInstance.post('/auth/register', userData)
			setAuthHeader(res.data.token)
			localStorage.setItem('token', res.data.token)
			toast.success('Реєстрація успішна')
			return res.data
		} catch (error) {
			if (error.response.status < 500) {
				toast.error('Користувач з такою поштою вже існує')
			} else {
				toast.error('Помилка реєстрації')
			}
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			// const dispatch = useDispatch()
			console.log({ email, password })
			const res = await axiosInstance.post('/auth/login', { email, password })
			console.log(res.data)

			localStorage.setItem('token', res.data.token)
			setAuthHeader(res.data.token)
			toast.success('Авторизація успішна')
			return res.data
		} catch (error) {
			if (error.response.status < 500) {
				toast.error('Користувач з такою поштою не знайдений')
			} else {
				toast.error('Помилка авторизації')
			}

			console.log(error)
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */

export const refreshUser = createAsyncThunk(
	'auth/refresh',
	async (_, thunkAPI) => {
		const state = thunkAPI.getState()
		const persistedToken = localStorage.getItem('token')
		console.log('=-=-=-=-', persistedToken)
		const headers = {
			Authorization: `Bearer ${persistedToken}`,
		}

		if (persistedToken === null) {
			return thunkAPI.rejectWithValue('Unable to fetch user')
		}

		try {
			setAuthHeader(persistedToken)
			const res = await axiosInstance.get('/auth/me', { headers })
			console.log(res.data)
			const user = await getUserById(res.data.userId)
			return user.data
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		clearAuthHeader()
		localStorage.setItem('token', '')
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})
