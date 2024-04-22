import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Header from './Header/Header'
import Loader from './Loader/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Layout = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>
			<ToastContainer position='top-center' />
		</>
	)
}
