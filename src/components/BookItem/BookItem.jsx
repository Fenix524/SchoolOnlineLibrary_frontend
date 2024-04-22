import clsx from 'clsx'
import React, { useState } from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { IoIosArrowDropdown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import {
	selectIsLoggedIn,
	selectUserRole,
} from '../../redux/auth/authSelectors'
import { Role } from '../../util/enums'
import css from './BookItem.module.css'
import { IoTrashBin } from 'react-icons/io5'

const BookItem = ({ book, withChange = false, onChangeItem, onDeleteItem }) => {
	// Вміст компонента
	const userRole = useSelector(selectUserRole)
	const isLogedIn = useSelector(selectIsLoggedIn)
	const [isOpen, setIsOpen] = useState(false)

	const btnClass = clsx({
		[css.open]: isOpen,
		[css.close]: !isOpen,
	})

	return (
		<>
			<ul className={css.book}>
				<li className={css.infoItem}>
					<span className={css.columnTitle}>Книга:</span>
					{book.name}
				</li>
				{userRole === Role.Admin && withChange && isLogedIn && (
					<>
						<button
							className={css.change}
							onClick={() => {
								onChangeItem(book?._id)
							}}
						>
							<HiOutlinePencilSquare
								className={btnClass}
								size={35}
								color='#C2B8A9'
							/>
						</button>

						<button
							className={css.delete}
							onClick={() => {
								onDeleteItem(book._id)
							}}
						>
							<IoTrashBin className={btnClass} size={35} color='#C2B8A9' />
						</button>
					</>
				)}
				<button
					className={css.showMore}
					onClick={() => {
						setIsOpen(isOpen ? false : true)
						console.log(isOpen)
					}}
				>
					<IoIosArrowDropdown className={btnClass} size={35} color='#C2B8A9' />
				</button>
			</ul>
			{isOpen && (
				<div className={css.moreInfo}>
					<ul className={css.moreInfoList}>
						<li className={css.moreInfoItem}>
							<span className={css.columnTitle}>Книга:</span>
							{book.name}
						</li>

						<li className={css.moreInfoItem}>
							<span className={css.columnTitle}>Автор:</span>
							{book.author.fullName || 'Не відомо'}
						</li>

						<li className={css.moreInfoItem}>
							<span className={css.columnTitle}>Рік:</span>
							{`${book.year}`}
						</li>
						<li className={css.moreInfoItem}>
							<span className={css.columnTitle}>Жанр:</span>
							{`${book.genre.map(el => el.genreName)}`}
						</li>
						<li className={css.moreInfoItem}>
							<span className={css.columnTitle}>Короткий опис:</span>
							{`${book.desc}`}
						</li>
					</ul>
				</div>
			)}
		</>
	)
}

export default BookItem
