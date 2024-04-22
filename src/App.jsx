import { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'
import { Layout } from './components/Layout'
import { RestrictedRoute } from './components/RestrictedRoute'
import { PrivateRoute } from './components/PrivateRoute'
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers'
import AdminBooks from './pages/Admin/AdminBooks/AdminBooks'
import AdminAuthors from './pages/Admin/AdminAuthors/AdminAuthors'
import AdminGenres from './pages/Admin/AdminGenres/AdminGenres'
import AdminBookCopies from './pages/Admin/AdminBookCopies/AdminBookCopies'
import Loader from './components/Loader/Loader'

import ProfilePage from './pages/ProfilePage/ProfilePage'
import { Role } from './util/enums'

import { useDispatch } from 'react-redux'
import { setToken } from './redux/auth/auth.slice'
import { refreshUser } from './redux/auth/authOperations'
import { setAuthHeader } from './util/axios'
// const Header = lazy(() => import('./components/Header/Header'))
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'))
const AuthorizationPage = lazy(() =>
	import('./pages/AuthorizationPage/AuthorizationPage')
)
const BooksPage = lazy(() => import('./pages/BooksPage/BooksPage'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const RegistrationPage = lazy(() =>
	import('./pages/RegistrationPage/RegistrationPage')
)

function App() {
	const { isLoggedIn, isRefreshing, user } = useAuth()
	console.log(isLoggedIn, isRefreshing, user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshUser())
	}, [dispatch])

	return (
		!isRefreshing && (
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/books' element={<BooksPage />} />
					<Route
						path='/authorization'
						element={
							<RestrictedRoute
								redirectTo='/books'
								component={AuthorizationPage}
							/>
						}
					/>
					<Route
						path='/registration'
						element={
							<RestrictedRoute
								redirectTo='/books'
								component={RegistrationPage}
							/>
						}
					/>
					<Route
						path='/admin'
						element={
							isLoggedIn && user.role === Role.Admin ? (
								<AdminPage />
							) : (
								<HomePage />
							)
						}
					>
						<Route path='users' element={<AdminUsers />} />
						<Route path='books' element={<AdminBooks />} />
						<Route path='authors' element={<AdminAuthors />} />
						<Route path='genres' element={<AdminGenres />} />
						<Route path='bookCopies' element={<AdminBookCopies />} />
					</Route>
					<Route
						path='/profile'
						element={
							<PrivateRoute redirectTo='/books' component={ProfilePage} />
						}
					/>
				</Route>
				<Route path='/loader' element={<Loader />} />
			</Routes>
		)
	)
}

export default App
