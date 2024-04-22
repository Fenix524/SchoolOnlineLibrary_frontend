import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
	selectIsLoggedIn,
	selectUserRole,
} from '../../redux/auth/authSelectors'
import { Role } from '../../util/enums'
import Container from '../Container/Container'
import Logo from '../Logo/Logo'
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation'
import css from './Header.module.css'

const Header = ({ showNav = true }) => {
	const isLogedIn = useSelector(selectIsLoggedIn)
	const userRole = useSelector(selectUserRole)
	const dispatch = useDispatch()
	// dispatch(setIsLoggedIn(true))

	const buildLinkClass = ({ isActive }) => {
		return clsx(css.navItemLink, isActive && css.active)
	}

	return (
		<div className={css.header}>
			<Container>
				<div className={css.top}>
					<Logo />
					<ProfileNavigation isLogedIn={isLogedIn} />
				</div>
			</Container>
			{showNav && (
				<div className={css.bot}>
					<Container>
						<ul className={css.navList}>
							<li className={css.navItem}>
								<NavLink to='/' className={buildLinkClass}>
									Головна
								</NavLink>
							</li>
							<li className={css.navItem}>
								<NavLink to='/books' className={buildLinkClass}>
									Книги
								</NavLink>
							</li>
							{userRole === Role.Admin && isLogedIn && (
								<li className={css.navItem}>
									<NavLink to='/admin' className={buildLinkClass}>
										Адмін панель
									</NavLink>
								</li>
							)}
						</ul>
					</Container>
				</div>
			)}
		</div>
	)
}

export default Header
