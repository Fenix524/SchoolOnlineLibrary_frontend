import { useSelector } from 'react-redux'
import {} from '..'
import {
	selectIsLoggedIn,
	selectUser,
	selectIsRefreshing,
} from '../redux/auth/authSelectors'

export const useAuth = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const isRefreshing = useSelector(selectIsRefreshing)
	const user = useSelector(selectUser)

	return {
		isRefreshing,
		isLoggedIn,
		user,
	}
}
