import React from 'react'
import BookItemList from '../../components/BookItemList/BookItemList'
import Container from '../../components/Container/Container'
import FilterBar from '../../components/FilterBar/FilterBar'
import Title from '../../components/Title/Title'
import css from './EBooksPage.module'

const EBooksPage = props => {
	return (
		<>
			{/* <Header /> */}
			{/* <MainWrapper> */}
			<Container>
				<div className={css.wrapper}>
					<div className={css.title}>
						<Title>Електронні книги</Title>
					</div>
					<FilterBar />
					<div className={css.list}>
						{/* <BookItemList books={booksArray} /> */}
					</div>
				</div>
			</Container>
			{/* </MainWrapper> */}
		</>
	)
}

export default EBooksPage
