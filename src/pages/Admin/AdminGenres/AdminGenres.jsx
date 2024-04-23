import css from './AdminGenres.module.css'
import React, { useEffect, useState } from 'react'
import FilterBar from '../../../components/FilterBar/FilterBar'
import Button from '../../../components/Button/Button'
import {
	createGenre,
	deleteGenre,
	getAllBooks,
	getAllGenres,
	updateGenre,
} from '../../../util/responsesToDB'
import BookItemList from '../../../components/BookItemList/BookItemList'
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper'
import { FaPlus } from 'react-icons/fa'
import { Form, Formik } from 'formik'
import FormInput from '../../../components/FieldsFolder/FormInput/FormInput'
import ListItem from '../../../components/ListItem/ListItem'
import ItemListWraper from '../../../components/ItemListWraper/ItemListWraper'
import * as yup from 'yup'
import adminCss from '../Admin.module.css'
import { useSearchParams } from 'react-router-dom'

const AdminGenres = props => {
	const [genres, setGenres] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [formMode, setFormMode] = useState('create')
	const [choiceGenre, setChoiceGenre] = useState({})
	const [updatePage, setUpdatePage] = useState(0)

	const [searchParams] = useSearchParams()

	useEffect(() => {
		getAllGenres({
			...Object.fromEntries(searchParams),
			sort: 'genreName',
		}).then(req => {
			setGenres(req.data)
			console.log(req.data)
		})
	}, [searchParams, updatePage])

	// useEffect(() => {
	// 	getAllGenres()
	// 		.then(res => {
	// 			if (res.status >= 200 && res.status < 300) {
	// 				console.log(res.data)
	// 				setGenres(res.data)
	// 			}
	// 		})
	// 		.catch(error => {})
	// }, [updatePage])

	const update = () => {
		setUpdatePage(updatePage + 1)
	}

	const initialValue = genre => {
		return {
			genreName: genre?.genreName || '',
		}
	}

	const validationSchema = yup.object().shape({
		genreName: yup.string().required("Жанр є обов'язковим"),
	})

	return (
		<>
			<div className={adminCss.filterBar}>
				<FilterBar />
				<div className={adminCss.addBookBtn}>
					<Button
						style='transparent'
						onClick={() => {
							setChoiceGenre(null)
							setModalIsOpen(true)
							setFormMode('create')
							console.log(modalIsOpen, formMode)
						}}
					>
						<p>Новий жанр</p>
						<FaPlus />
					</Button>
				</div>
			</div>
			<div className={css.bookListWrapper}>
				<ItemListWraper>
					{genres.map(genre => (
						<ListItem
							key={genre._id}
							itemId={genre._id}
							withChange={true}
							infoList={[{ label: 'Жанр', value: genre.genreName }]}
							onChangeItem={() => {
								setChoiceGenre(genre)
								console.log('Вибір жанру+++', genre)
								setModalIsOpen(true)
								setFormMode('update')
							}}
							onDeleteItem={async () => {
								const deleatedGenre = await deleteGenre(genre._id)
								console.log(deleatedGenre)
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
								const newGenre = await updateGenre(choiceGenre._id, data)
								console.log(newGenre)
								update()
							}
							if (formMode === 'create') {
								const newGenre = await createGenre(data)
								console.log(newGenre)
								update()
							}
						}}
						initialValues={initialValue(choiceGenre)}
						validationSchema={validationSchema}
					>
						<Form className={css.form}>
							<FormInput fieldTitle={'Жанр'} fieldName={'genreName'} />
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

export default AdminGenres
