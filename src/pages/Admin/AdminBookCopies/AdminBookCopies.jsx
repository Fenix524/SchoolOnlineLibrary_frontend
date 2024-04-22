import React, { useEffect, useState } from 'react'
import css from './AdminBookCopies.module.css'
import FilterBar from '../../../components/FilterBar/FilterBar'
import Button from '../../../components/Button/Button'
import {
	createBookCopy,
	deleteBookCopy,
	getAllAuthors,
	getAllBookCopies,
	getAllBooks,
	getAllUsers,
	updateBookCopy,
} from '../../../util/responsesToDB'
import BookItemList from '../../../components/BookItemList/BookItemList'
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper'
import { FaPlus } from 'react-icons/fa'
import ListItem from '../../../components/ListItem/ListItem'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import adminCss from '../Admin.module.css'
import FormInput from '../../../components/FieldsFolder/FormInput/FormInput'
import ItemListWraper from '../../../components/ItemListWraper/ItemListWraper'
import { useSearchParams } from 'react-router-dom'

const AdminBookCopies = props => {
	const [bookCopies, setBookCopies] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [formMode, setFormMode] = useState('create')
	const [choiceBookCopy, setChoiceBookCopy] = useState({})
	const [updatePage, setUpdatePage] = useState(0)

	const [usersOptions, setUsersOptions] = useState([{ value: '', label: '' }])
	const [booksOptions, setBooksOptions] = useState([{ value: '', label: '' }])

	const [searchParams] = useSearchParams()

	useEffect(() => {
		getAllBookCopies({
			...Object.fromEntries(searchParams),
			sort: 'copyId',
		}).then(req => {
			setBookCopies(req.data)
			console.log(req.data)
		})
	}, [searchParams])
	useEffect(() => {
		const fetchData = async () => {
			try {
				const users = await getAllUsers()
				setUsersOptions(
					users.data.map(user => {
						return {
							value: user._id,
							label: user.firstName + ' ' + user.lastName,
						}
					})
				)
			} catch (error) {}

			try {
				const books = await getAllBooks()
				// console.log(books.data)
				setBooksOptions(
					books.data.map(book => {
						return { value: book._id, label: book.name }
					})
				)
			} catch (error) {}
		}
		fetchData()
	}, [])
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const bookCopies = await getAllBookCopies()
	// 			setBookCopies(bookCopies.data)
	// 			console.log('Копії книг', bookCopies)
	// 		} catch (error) {
	// 			console.error('Помилка отримання копій книг:', error)
	// 		}
	// 	}
	// 	fetchData()
	// }, [updatePage])

	const update = () => {
		setUpdatePage(updatePage + 1)
	}

	const initialValue = bookCopy => {
		return {
			copyId: bookCopy?.copyId || '',
			bookId: bookCopy?.bookId._id || '',
			userId: bookCopy?.userId._id || '',
			issuedDate: bookCopy?.issuedDate || '',
			dueDate: bookCopy?.dueDate || '',
		}
	}

	const validationSchema = yup.object().shape({
		copyId: yup.string().required("ID екземпляра є обов'язковим"),
		bookId: yup.string().required("ID книги є обов'язковим"),
		userId: yup.string().nullable(),
		issuedDate: yup.date().nullable(),
		dueDate: yup.date().nullable().min(yup.ref('issuedDate')),
	})

	return (
		<>
			<div className={adminCss.filterBar}>
				<FilterBar />
				<div className={adminCss.addBookBtn}>
					<Button
						style='transparent'
						onClick={() => {
							setChoiceBookCopy(null)
							setModalIsOpen(true)
							setFormMode('create')
							// console.log(modalIsOpen, formMode)
						}}
					>
						<p>Новий екземпляр </p>
						<FaPlus />
					</Button>
				</div>
			</div>
			<div className={css.bookListWrapper}>
				<ItemListWraper>
					{bookCopies.map(bookCopy => {
						return (
							<ListItem
								key={bookCopy.copyId}
								itemId={bookCopy.copyId}
								withChange={true}
								infoList={[
									{
										label: bookCopy.bookId?.name || '',
										value: bookCopy.copyId,
									},
									{ label: 'Книга', value: bookCopy.bookId?.name || '' },
									{
										label: 'Власник Книги',
										value:
											bookCopy.userId.firstName +
												' ' +
												bookCopy.userId.lastName || 'Немає',
									},
									{
										label: 'Дата видачі',
										value: bookCopy.issuedDate,
									},
									{
										label: 'Дата повернення',
										value: bookCopy.dueDate,
									},
								]}
								onChangeItem={() => {
									setChoiceBookCopy(bookCopy)
									console.log('Вибір екземпляра+++', bookCopy)
									setModalIsOpen(true)
									setFormMode('update')
								}}
								onDeleteItem={async () => {
									const deletedBookCopy = await deleteBookCopy(bookCopy.copyId)
									console.log(deletedBookCopy)
									update()
								}}
							/>
						)
					})}
				</ItemListWraper>
			</div>
			{modalIsOpen && (
				<ModalWrapper setIsVisible={setModalIsOpen}>
					<Formik
						onSubmit={async data => {
							if (formMode === 'update') {
								console.log('1=1=1=1=1=1=1=1', data)
								const newBookCopy = await updateBookCopy(
									choiceBookCopy.copyId,
									data
								)
								console.log(newBookCopy)
								update()
							}
							if (formMode === 'create') {
								console.log('2=2=2=2=2=2=2=2', data)
								const newBookCopy = await createBookCopy(data)
								console.log(newBookCopy)
								update()
							}
						}}
						initialValues={initialValue(choiceBookCopy)}
						validationSchema={validationSchema}
					>
						<Form className={css.form}>
							<FormInput fieldTitle={'ID екземпляра'} fieldName={'copyId'} />
							<FormInput
								fieldTitle={'ID книги'}
								fieldName={'bookId'}
								fieldType='select'
								options={booksOptions}
								initialValue={booksOptions.find(option => {
									return option.value === choiceBookCopy?.bookId._id
								})}
							/>
							<FormInput
								fieldTitle={'ID користувача'}
								fieldName={'userId'}
								fieldType='select'
								options={usersOptions}
								initialValue={usersOptions.find(option => {
									return option.value === choiceBookCopy?.userId._id
								})}
							/>
							<FormInput
								fieldTitle={'Дата видачі'}
								fieldName={'issuedDate'}
								fieldContentType={'date'}
							/>
							<FormInput
								fieldTitle={'Дата повернення'}
								fieldName={'dueDate'}
								fieldContentType={'date'}
							/>
							<div className={css.btn}>
								<Button type={'submit'}>Підтвердити</Button>
							</div>
						</Form>
					</Formik>
				</ModalWrapper>
			)}
		</>
	)
}

export default AdminBookCopies
