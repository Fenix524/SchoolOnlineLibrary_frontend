import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import React from 'react'

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
	const { isLoggedIn } = useAuth()

	return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />
}
