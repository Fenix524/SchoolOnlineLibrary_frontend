import React, { useEffect, useState } from 'react'
import css from './AdminAuthors.module.css'
import FilterBar from '../../../components/FilterBar/FilterBar'
import Button from '../../../components/Button/Button'
import {
	createAuthor,
	deleteAuthor,
	getAllAuthors,
	getAllBooks,
	getAllGenres,
	updateAuthor,
} from '../../../util/responsesToDB'
import BookItemList from '../../../components/BookItemList/BookItemList'
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper'
import { FaPlus } from 'react-icons/fa'
import FormInput from '../../../components/FieldsFolder/FormInput/FormInput'
import { Form, Formik } from 'formik'
import ListItem from '../../../components/ListItem/ListItem'
import * as yup from 'yup'
import ItemListWraper from '../../../components/ItemListWraper/ItemListWraper'
import adminCss from '../Admin.module.css'
import { useSearchParams } from 'react-router-dom'

const AdminAuthors = props => {
	const [authors, setAuthors] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [formMode, setFormMode] = useState('create')
	const [choiceAuthor, setChoiceAuthor] = useState({})
	const [updatePage, setUpdatePage] = useState(0)

	const [searchParams] = useSearchParams()

	useEffect(() => {
		getAllAuthors({
			...Object.fromEntries(searchParams),
			sort: 'genreName',
		}).then(req => {
			setAuthors(req.data)
			console.log(req.data)
		})
	}, [searchParams])

	const update = () => {
		setUpdatePage(updatePage + 1)
	}

	const initialValue = author => {
		return {
			fullName: author?.fullName || '',
			alias: author?.alias || '',
			dateOfBirth: author?.dateOfBirth || '',
			biography: author?.biography || '',
		}
	}

	const validationSchema = yup.object().shape({
		fullName: yup.string().required("Повне ім'я є обов'язковим"),
		dateOfBirth: yup.string(),
	})

	return (
		<>
			<div className={adminCss.filterBar}>
				<FilterBar />
				<div className={adminCss.addBookBtn}>
					<Button
						style='transparent'
						onClick={() => {
							setChoiceAuthor(null)
							setModalIsOpen(true)
							setFormMode('create')
							console.log(modalIsOpen, formMode)
						}}
					>
						<p>Новий автор </p>
						<FaPlus />
					</Button>
				</div>
			</div>
			<div className={css.bookListWrapper}>
				<ItemListWraper>
					{authors.map(author => (
						<ListItem
							key={author._id}
							itemId={author._id}
							withChange={true}
							infoList={[
								{ label: 'ПІБ', value: author.fullName },
								{ label: 'Псевдонім', value: author.alias || 'Немає' },
								{
									label: 'Дата народження',
									value: author.dateOfBirth
										? new Date(author.dateOfBirth).toLocaleDateString()
										: 'Немає',
								},
							]}
							onChangeItem={() => {
								setChoiceAuthor(author)
								console.log('Вибір автора+++', author)
								setModalIsOpen(true)
								setFormMode('update')
							}}
							onDeleteItem={async () => {
								const deletedAuthor = await deleteAuthor(author._id)
								console.log(deletedAuthor)
								update()
							}}
						/>
					))}
				</ItemListWraper>
			</div>
			{modalIsOpen && (
				<ModalWrapper setIsVisible={setModalIsOpen}>
					<Formik
						onSubmit={async data => {
							if (formMode === 'update') {
								console.log(data)
								const newAuthor = await updateAuthor(choiceAuthor._id, data)
								console.log(newAuthor)
								update()
							}
							if (formMode === 'create') {
								const newAuthor = await createAuthor(data)
								console.log('Новий автор', newAuthor)
								update()
							}
						}}
						initialValues={initialValue(choiceAuthor)}
						validationSchema={validationSchema}
					>
						<Form className={css.form}>
							<FormInput fieldTitle={'ПІБ'} fieldName={'fullName'} />
							<FormInput fieldTitle={'Псевдонім'} fieldName={'alias'} />
							<FormInput
								fieldTitle={'Дата народження'}
								fieldName='dateOfBirth'
								fieldContentType={'date'}
							/>
							<FormInput
								fieldTitle={'Біографія'}
								fieldName={'biography'}
								fieldType={'textarea'}
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

export default AdminAuthors
