import React from 'react'
import MainWrapper from '../MainWrapper/MainWrapper'
import css from './Loader.module.css'

const Loader = props => {
	// Вміст компонента

	return (
		<MainWrapper>
			<div className={css.wrapper}>
				<p>Завантаження...</p>
			</div>
		</MainWrapper>
	)
}

export default Loader
