import React from 'react'
import css from './MainWrapper.module.css'

const MainWrapper = ({ children }) => {
	return <main className={css.main}>{children}</main>
}

export default MainWrapper
