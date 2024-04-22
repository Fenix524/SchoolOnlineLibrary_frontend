import React, { useEffect, useState } from 'react'
import BookItemList from '../../components/BookItemList/BookItemList'
import Container from '../../components/Container/Container'
import FilterBar from '../../components/FilterBar/FilterBar'
import Title from '../../components/Title/Title'
import css from './BooksPage.module.css'
import { getAllBooks } from '../../util/responsesToDB'
import { useSearchParams } from 'react-router-dom'

const BooksPage = props => {
	const [books, setBooks] = useState([])
	const [searchParams] = useSearchParams()

	useEffect(() => {
		getAllBooks({ ...Object.fromEntries(searchParams), sort: 'name' }).then(
			req => {
				setBooks(req.data)
				console.log(req.data)
			}
		)
	}, [searchParams])

	return (
		<>
			<Container>
				<div className={css.wrapper}>
					<div className={css.title}>
						<Title>Книги</Title>
					</div>
					<FilterBar />
					<div className={css.list}>
						<BookItemList books={books} />
					</div>
				</div>
			</Container>
		</>
	)
}

export default BooksPage
