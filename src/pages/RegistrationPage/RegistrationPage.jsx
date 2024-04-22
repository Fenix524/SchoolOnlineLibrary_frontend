import { Form, Formik } from 'formik'
import React, { useId } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import Button from '../../components/Button/Button'
import FormInput from '../../components/FieldsFolder/FormInput/FormInput'
import Title from '../../components/Title/Title'
import { setIsLoggedIn } from '../../redux/auth/auth.slice'
import css from './RegistrationPage.module.css'
import { register } from '../../redux/auth/authOperations'
import { AppDispatch } from '../../redux/store'

const RegistrationPage = props => {
	const firstNameFieldId = useId()
	const lastNameFieldId = useId()
	const emailFieldId = useId()
	const passwordFieldId = useId()

	const initialValues = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	}

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Invalid email format')
			.required('Email is required'),
		password: yup
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.required('Password is required'),
		firstName: yup
			.string()
			.trim('Please remove leading/trailing spaces')
			.required('First name is required'),
		lastName: yup
			.string()
			.trim('Please remove leading/trailing spaces')
			.required('Last name is required'),
	})

	const dispatch = useDispatch()

	const handleSubmit = values => {
		// Отримання даних з форми
		console.log('Email:', values.email)
		console.log('Password:', values.password)
		const { firstName, lastName, email, password } = values

		dispatch(
			register({
				firstName: firstName,
				lastName: lastName,
				email: email,
				hashPassword: password,
			})
		)
	}

	return (
		<>
			{/* <Header showNav={false} /> */}
			<main className={css.mainWrapper}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form className={css.form}>
						<div className={css.title}>
							<Title>Реєстрація</Title>
						</div>
						<FormInput
							fieldTitle='імя'
							fieldId={firstNameFieldId}
							fieldName='firstName'
						/>
						<FormInput
							fieldTitle='Прізвище'
							fieldId={lastNameFieldId}
							fieldName='lastName'
						/>
						<FormInput
							fieldTitle='Пошта'
							fieldId={emailFieldId}
							fieldName='email'
						/>
						<FormInput
							fieldTitle='Пароль'
							fieldId={passwordFieldId}
							fieldName='password'
							fieldContentType='password'
						/>
						<div className={css.btn}>
							<Button type={'submit'}>Підтвердити</Button>
						</div>
						<div className={css.helpBar}>
							<Link to={'/authorization'}>Увійти до профілю?</Link>
						</div>
					</Form>
				</Formik>
			</main>
		</>
	)
}

export default RegistrationPage
