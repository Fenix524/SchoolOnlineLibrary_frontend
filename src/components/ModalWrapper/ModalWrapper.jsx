import React from 'react'
import css from './ModalWrapper.module.css'

const ModalWrapper = ({ children, setIsVisible }) => {
	// Вміст компонента

	return (
		<div className={css.formBg}>
			<button
				className={css.closeBtn}
				onClick={() => {
					setIsVisible(false)
				}}
			>
				Close
			</button>
			<div className={css.formWrapper}>{children}</div>
		</div>
	)
}

export default ModalWrapper
