import clsx from 'clsx'
import React from 'react'
import css from './Button.module.css'

const Button = ({ children, style = 'brown', type = 'button', onClick }) => {
	const baseClasses = clsx(css.btn, css[style])
	return (
		<button className={baseClasses} type={type} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
