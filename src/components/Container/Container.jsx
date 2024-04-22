import React from 'react'
import css from './Container.module.css'

const Container = ({ children }) => {
	// Додавання документації
	/**
	 * Компонент-контейнер
	 * @param children - Вміст компонента
	 */

	return <div className={css.container}>{children}</div>
}

export default Container
