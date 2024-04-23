import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import BookItemList from '../../components/BookItemList/BookItemList'
import Button from '../../components/Button/Button'
import ChangeFormMini from '../../components/ChangeFormMini/ChangeFormMini'
import Container from '../../components/Container/Container'
import Title from '../../components/Title/Title'
import { setIsLoggedIn, setUser } from '../../redux/auth/auth.slice'
import { selectUser } from '../../redux/auth/authSelectors'
import css from './ProfilePage.module.css'
import { baseValues } from '../../util/enums'
import { getUserBooks, updateUser } from '../../util/responsesToDB'
import ListItem from '../../components/ListItem/ListItem'
import { logOut } from '../../redux/auth/authOperations'
import ItemListWraper from '../../components/ItemListWraper/ItemListWraper'
import { Form, Formik } from 'formik'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import * as yup from 'yup'
import FormInput from '../../components/FieldsFolder/FormInput/FormInput'

const ProfilePage = props => {
	const dispatch = useDispatch()
	const curentUser = useSelector(selectUser)

	const [bookCopies, setBookCopies] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)

	useEffect(() => {
		async function foo() {
			const books = await getUserBooks(curentUser._id)
			console.log('Книги користувача', books.data)
			setBookCopies(books.data)
		}
		foo()
	}, [])

	// Вміст компонента
	const userInformations = [
		{ key: 'firstName', nameColumn: 'Імя', value: curentUser.firstName },
		{ key: 'lastName', nameColumn: 'Прізвище', value: curentUser.lastName },
		{ key: 'email', nameColumn: 'Пошта', value: curentUser.email },
		{
			key: 'dateOfBirth',
			nameColumn: 'Дата народження',
			value: curentUser.dateOfBirth,
		},
	]

	const initialValue = user => {
		return {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
			dateOfBirth: user?.dateOfBirth || '',
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
	})

	return (
		<div className={css.wrapper}>
			<Container>
				<div className={css.leftSide}>
					<img
						src={curentUser.profilePictureUrl || baseValues.UserLogo}
						alt='User logo'
						className={css.userLogo}
					/>
					<ul className={css.userInfoList}>
						{userInformations?.map(inf => (
							<li className={css.userInfoItem}>
								<div className={css.userInfoItemTextPart}>
									<span className={css.itemTitle}>{inf.nameColumn + ':'}</span>
									<p className={css.itemInfo}>{inf.value}</p>
								</div>
								<div className={css.point}></div>
							</li>
						))}
					</ul>
					<div className={css.navButtonsBox}>
						<Button
							style='transparent'
							onClick={() => {
								dispatch(logOut())
							}}
						>
							Вийти з профілю
						</Button>
						<Button
							style='transparent'
							onClick={() => {
								setModalIsOpen(true)
							}}
						>
							Редагувати профіль
						</Button>
					</div>
				</div>
				<div className={css.rightSide}>
					<Title>Твої книги</Title>
					<div className={css.bookList}>
						<ItemListWraper>
							{!bookCopies ? (
								<p>Ой тут порожньо! 🤔</p>
							) : (
								bookCopies?.map(bookCopy => {
									return (
										<ListItem
											key={bookCopy.copyId}
											itemId={bookCopy.copyId}
											infoList={[
												{
													label: bookCopy.bookId?.name,
													value: bookCopy.copyId,
												},
												{ label: 'Книга', value: bookCopy.bookId?.name },
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
										/>
									)
								})
							)}
						</ItemListWraper>
					</div>
				</div>
			</Container>
			{modalIsOpen && (
				<ModalWrapper setIsVisible={setModalIsOpen}>
					<Formik
						onSubmit={async data => {
							console.log({ ...curentUser, ...data })
							const togather = { ...curentUser, ...data }
							const { _id, firstName, lastName, email, dateOfBirth } = togather
							const newUser = await updateUser(_id, {
								firstName,
								lastName,
								email,
								dateOfBirth,
							})
							if (newUser?.status >= 200 && newUser?.status < 300) {
								dispatch(setUser(newUser.data))
							}
							console.log(newUser)
						}}
						initialValues={initialValue(curentUser)}
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
							<div className={css.btn}>
								<Button type={'submit'}>Підтвердити</Button>
							</div>
						</Form>
					</Formik>
				</ModalWrapper>
			)}
		</div>
	)
}

export default ProfilePage
