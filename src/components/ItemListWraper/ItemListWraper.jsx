import React from 'react'
import css from './ItemListWraper.module.css'

const ItemListWraper = ({ children }) => {
	return <ul className={css.itemListWrapper}>{children}</ul>
}

export default ItemListWraper
