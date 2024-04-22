import React from 'react'
import BookItem from '../BookItem/BookItem'
import css from './BookItemList.module.css'

const BookItemList = ({
	books,
	canChange = false,
	onChangeItem = id => {
		console.log(`Оновлено елемент з ід: ${id}`)
	},
	onDeleteItem = id => {
		console.log(`Видалено елемент з ід: ${id}`)
	},
}) => {
	// Вміст компонента

	return (
		<ul className={css.bookItemList}>
			{books?.length ? (
				books.map(book => {
					return (
						book && (
							<div className={css.wrapper}>
								<BookItem
									book={book}
									withChange={canChange}
									onChangeItem={onChangeItem}
									onDeleteItem={onDeleteItem}
								/>
							</div>
						)
					)
				})
			) : (
				<p>Ой, тут порожньо</p>
			)}
		</ul>
	)
}

export default BookItemList
