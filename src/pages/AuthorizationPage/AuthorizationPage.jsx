import { Form, Formik } from 'formik'
import React, { useId } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import Button from '../../components/Button/Button'
import FormInput from '../../components/FieldsFolder/FormInput/FormInput'
import Title from '../../components/Title/Title'
import { AuthState, setIsLoggedIn } from '../../redux/auth/auth.slice'
import css from './AuthorizationPage.module.css'
import { logIn } from '../../redux/auth/authOperations'
import { AppDispatch } from '../../redux/store'

const AuthorizationPage = props => {
	const dispatch = useDispatch()

	// Вміст компонента
	const firstNameFieldId = useId()
	const lastNameFieldId = useId()
	const emailFieldId = useId()
	const passwordFieldId = useId()

	const initialValues = {
		email: '',
		password: '',
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
	})

	const handleSubmit = values => {
		const { email, password } = values
		dispatch(logIn({ email, password })) // Assuming logIn takes typed data
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
							<Title>Авторизація</Title>
						</div>
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
							<Link to={'/registration'}>Створити профіль?</Link>
						</div>
					</Form>
				</Formik>
			</main>
		</>
	)
}

export default AuthorizationPage
