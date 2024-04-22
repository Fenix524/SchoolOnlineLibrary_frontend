import React, { useState } from 'react'

import Title from '../../components/Title/Title'
import './AdminPage.module.css'
import css from './AdminPage.module.css'
import { FaChevronRight } from 'react-icons/fa'
import Button from '../../components/Button/Button'

import { NavLink, Outlet } from 'react-router-dom'
import clsx from 'clsx'

const AdminPage = props => {
	const [isOpenNav, setIsOpenNav] = useState()
	// Вміст компонента

	const buildLinkClass = ({ isActive }) => {
		return clsx(css.link, isActive && css.active)
	}

	return (
		<>
			<div className={css.wrapper}>
				<div className={`${css.navSide} ${isOpenNav ? css.open : ''}`}>
					<div className={css.title}>
						<Title size='small'>Панель керуання</Title>
					</div>
					<ul className={css.navList}>
						<li className={css.navItem}>
							<NavLink to='books' className={buildLinkClass} replace={true}>
								# Книги
							</NavLink>
						</li>
						<li className={css.navItem}>
							<NavLink to='users' className={buildLinkClass} replace={true}>
								# Користувачі
							</NavLink>
						</li>
						<li className={css.navItem}>
							<NavLink
								to='bookCopies'
								className={buildLinkClass}
								replace={true}
							>
								# Копії книги
							</NavLink>
						</li>
						<li className={css.navItem}>
							<NavLink to='genres' className={buildLinkClass} replace={true}>
								# Жанри книг
							</NavLink>
						</li>
						<li className={css.navItem}>
							<NavLink to='authors' className={buildLinkClass} replace={true}>
								# Автори книг
							</NavLink>
						</li>
					</ul>
					<button
						className={`${css.openNavBtn} ${isOpenNav ? css.open : ''}`}
						onClick={() => {
							isOpenNav ? setIsOpenNav(false) : setIsOpenNav(true)
						}}
					>
						<FaChevronRight size={30} />
					</button>
				</div>
				<div className={css.mainSide}>
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default AdminPage
