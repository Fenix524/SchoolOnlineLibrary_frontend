import React from 'react'
import { Link } from 'react-router-dom'
import css from './Logo.module.css'

const Logo = props => {
	// Вміст компонента

	return (
		<Link to='/' className={css.logo}>
			OLibrary
		</Link>
	)
}

export default Logo
