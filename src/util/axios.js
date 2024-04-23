import axios from 'axios'

// Utility to add JWT
export const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

// Utility to remove JWT
export const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = ''
}

export const axiosInstance = axios.create({
	// baseURL: 'http://localhost:3333/',
	baseURL: 'https://schoolonlinelibrary-backend-1.onrender.com/',
})
