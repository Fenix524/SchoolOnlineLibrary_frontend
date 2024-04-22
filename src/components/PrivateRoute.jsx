import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
	const { isLoggedIn } = useAuth()

	return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />
}
