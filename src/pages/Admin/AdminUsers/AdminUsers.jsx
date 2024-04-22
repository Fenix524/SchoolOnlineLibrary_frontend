import React, { useEffect, useState } from 'react'
import css from './AdminUsers.module.css'
import FilterBar from '../../../components/FilterBar/FilterBar'
import Button from '../../../components/Button/Button'
import {
	addImg,
	createUser,
	getAllBooks,
	getAllUsers,
	updateUser,
} from '../../../util/responsesToDB'
import BookItemList from '../../../components/BookItemList/BookItemList'
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper'
import { FaPlus } from 'react-icons/fa'
import ListItem from '../../../components/ListItem/ListItem'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import FormInput from '../../../components/FieldsFolder/FormInput/FormInput'
import ItemListWraper from '../../../components/ItemListWraper/ItemListWraper'
import { useSearchParams } from 'react-router-dom'

const AdminUsers = props => {
	const [users, setUsers] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [formMode, setFormMode] = useState('create')
	const [choiceUser, setChoiceUser] = useState({})

	const [searchParams] = useSearchParams()

	useEffect(() => {
		getAllUsers({
			...Object.fromEntries(searchParams),
			sort: 'firstName',
		}).then(req => {
			setUsers(req.data)
			console.log(req.data)
		})
	}, [searchParams])

	const initialValue = user => {
		return {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
			dateOfBirth: user?.dateOfBirth || '',
			role: user?.role || '',
			profilePictureUrl: user?.profilePictureUrl || '',
		}
	}

	const validationSchema = yup.object().shape({
		firstName: yup.string().required("Ім'я є обов'язковим"),
		lastName: yup.string().required("Прізвище є обов'язковим"),
		email: yup
			.string()
			.email('Введіть правильну адресу електронної пошти')
			.required("Електронна пошта є обов'язковою"),
		dateOfBirth: yup.date().nullable(),
		role: yup.string().required("Роль є обов'язковою"),
	})

	const userRoleOptions = [
		{ value: 'user', label: 'Користувач' },
		{ value: 'admin', label: 'Адміністратор' },
	]

	return (
		<>
			<div className={css.filterBar}>
				<FilterBar />
			</div>
			<div className={css.bookListWrapper}>
				<ItemListWraper>
					{users.map(user => (
						<ListItem
							key={user._id}
							itemId={user._id}
							withChange={true}
							infoList={[
								{ label: 'ПІБ', value: user.firstName + ' ' + user.lastName },
								{ label: 'Імя', value: user.firstName },
								{ label: 'Прізвище', value: user.lastName },
								{ label: 'Пошта', value: user.email },
								{
									label: 'Дата народження',
									value: user.dateOfBirth || 'Немає',
								},
								{ label: 'Роль', value: user.role },
							]}
							onChangeItem={() => {
								setChoiceUser(user)
								console.log('Вибір користувача+++', user)
								setModalIsOpen(true)
								setFormMode('update')
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
								console.log({ ...choiceUser, ...data })
								const togather = { ...choiceUser, ...data }
								const {
									_id,
									firstName,
									lastName,
									email,
									profilePictureUrl,
									role,
									dateOfBirth,
								} = togather
								const newUser = await updateUser(_id, {
									firstName,
									lastName,
									email,
									profilePictureUrl,
									role,
									dateOfBirth,
								})
								console.log(newUser)
							}
						}}
						initialValues={initialValue(choiceUser)}
						validationSchema={validationSchema}
					>
						<Form
							className={css.form}
							enctype='multipart/form-data'
							method='post'
						>
							<FormInput fieldTitle={'Імя'} fieldName={'firstName'} />
							<FormInput fieldTitle={'Прізвище'} fieldName={'lastName'} />
							<FormInput
								fieldTitle={'Пошта'}
								fieldName={'email'}
								fieldContentType={'email'}
							/>
							<FormInput
								fieldTitle={'Дата народження'}
								fieldName={'dateOfBirth'}
								fieldContentType={'date'}
							/>
							<FormInput
								fieldTitle={'Роль'}
								fieldName={'role'}
								fieldType={'select'}
								options={userRoleOptions}
								initialValue={userRoleOptions.find(
									option => option.value === choiceUser?.role
								)}
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

export default AdminUsers
