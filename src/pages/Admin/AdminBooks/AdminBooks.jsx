import React, { useEffect, useId, useState } from 'react'
import css from './AdminBooks.module.css'
import FilterBar from '../../../components/FilterBar/FilterBar'
import Button from '../../../components/Button/Button'
import { FaPlus } from 'react-icons/fa'
import BookItemList from '../../../components/BookItemList/BookItemList'
import {
	createBook,
	deleteBook,
	getAllAuthors,
	getAllBooks,
	getAllGenres,
	updateBook,
} from '../../../util/responsesToDB'
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper'
import { Field, Form, Formik } from 'formik'
import FormInput from '../../../components/FieldsFolder/FormInput/FormInput'
import * as yup from 'yup'
import adminCss from '../Admin.module.css'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'

const AdminBooks = props => {
	const [books, setBooks] = useState([])

	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [formMode, setFormMode] = useState('create')
	const [bookId, setBookId] = useState(null)

	const [authorOptions, setAuthorOptions] = useState([])
	const [genreOptions, setGenreOptions] = useState([])

	const bookNameId = useId()
	const authorId = useId()
	const yearId = useId()
	const ageRatingId = useId()
	const genreId = useId()
	const descId = useId()

	const [searchParams] = useSearchParams()

	const [updatePage, setUpdatePage] = useState(0)
	const update = () => {
		setUpdatePage(updatePage + 1)
	}

	useEffect(() => {
		getAllBooks({ ...Object.fromEntries(searchParams), sort: 'name' }).then(
			req => {
				setBooks(req.data)
				console.log(req.data)
			}
		)
	}, [searchParams, updatePage])

	useEffect(() => {
		getAllAuthors({
			...Object.fromEntries(searchParams),
			sort: 'fullName',
		}).then(res => {
			console.log('Автори', res.data)
			setAuthorOptions(
				res.data.map(author => {
					return { value: author?._id, label: author?.fullName }
				})
			)
		})

		getAllGenres({
			...Object.fromEntries(searchParams),
			sort: 'genreName',
		}).then(res => {
			console.log('Жанри', res.data)
			setGenreOptions(
				res.data.map(genre => {
					return { value: genre?._id, label: genre?.genreName }
				})
			)
		})
	}, [])

	const validationSchema = yup.object({
		name: yup.string().required('Book name is required'),
		author: yup.string().required('Author is required'),
		year: yup
			.number()
			.required('Year is required')
			.positive('Year must be positive')
			.integer('Year must be an integer'),
		genre: yup.string().required('Genre is required'),
		ageRating: yup.string(),
		desc: yup.string(),
	})

	const initialValues = bookData => {
		const iv = {
			name: bookData?.name || '',
			author: bookData?.author._id || '', // Use author ID for the select field
			year: bookData?.year || '',
			genre: bookData?.genre[0]._id || '', // Use genre ID for the select field
			ageRating: bookData?.ageRating || '',
			desc: bookData?.desc || 'Відсутній',
		}
		// console.log('+++++++++++++ Initial Value +++++++++++++++++', iv)
		return iv
	}

	return (
		<>
			<div className={adminCss.filterBar}>
				<FilterBar />
				<div className={adminCss.addBookBtn}>
					<Button
						style='transparent'
						onClick={() => {
							setBookId(null)
							setModalIsOpen(true)
							setFormMode('create')
							// console.log(modalIsOpen, formMode)
						}}
					>
						<p>Нова книга </p>
						<FaPlus />
					</Button>
				</div>
			</div>
			<div className={css.bookListWrapper}>
				<BookItemList
					books={books}
					canChange={true}
					onChangeItem={id => {
						setBookId(id)
						setFormMode('update')
						setModalIsOpen(true)
					}}
					onDeleteItem={id => {
						deleteBook(id)
						update()
					}}
				/>
			</div>
			{modalIsOpen && (
				<ModalWrapper setIsVisible={setModalIsOpen}>
					<Formik
						onSubmit={async data => {
							console.log(data)
							if (formMode === 'create') {
								const addedBook = await createBook({
									...data,
									genre: [data.genre],
								})
								// console.log(addedBook)
								if (addedBook) {
									update()
								}
							}
							if (formMode === 'update') {
								const updatedBook = await updateBook(bookId, data)
								// console.log(updatedBook)
								if (updatedBook) {
									update()
								}
							}
						}}
						validationSchema={validationSchema}
						initialValues={initialValues(
							books.find(book => book._id === bookId)
						)}
					>
						<Form className={css.form}>
							<FormInput
								fieldTitle={'Книга'}
								fieldName={'name'}
								fieldId={bookNameId}
							/>
							<FormInput
								fieldTitle={'Автор'}
								fieldName={'author'}
								fieldId={authorId}
								fieldType='select'
								options={authorOptions}
								initialValue={authorOptions.find(option => {
									return (
										option.value ===
										books.find(book => book?._id === bookId)?.author._id
									)
								})}
							/>
							<FormInput
								fieldTitle={'Рік'}
								fieldName={'year'}
								fieldId={yearId}
							/>
							<FormInput
								fieldTitle={'Віковий рейтинг'}
								fieldName={'ageRating'}
								fieldId={ageRatingId}
							/>
							<FormInput
								fieldTitle={'Жанр'}
								fieldName={'genre'}
								fieldId={genreId}
								fieldType='select'
								options={genreOptions}
								initialValue={genreOptions.find(option => {
									return (
										option.value ===
										books.find(book => book._id === bookId)?.genre[0]._id
									)
								})}
							/>
							<FormInput
								fieldTitle={'Короткий опис'}
								fieldName={'desc'}
								fieldId={descId}
								fieldType='textarea'
							/>
							<div className={css.btn}>
								<Button type='submit'>Зберегти</Button>
							</div>
						</Form>
					</Formik>
				</ModalWrapper>
			)}
		</>
	)
}

export default AdminBooks
