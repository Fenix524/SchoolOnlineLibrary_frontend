import React, { useState } from 'react'
import FormInput from '../FieldsFolder/FormInput/FormInput' // Assumption
import { Form, Formik } from 'formik'
import css from './DynamicForm.module.css'
import Button from '../Button/Button'

const DynamicForm = ({ fields, onSubmit, setModalVisibility }) => {
	const [formData, setFormData] = useState({}) // Set initial state type

	const handleChange = event => {
		const { name, value } = event.target
		console.log({ ...formData, [name]: value })

		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = event => {
		onSubmit(formData)
	}

	// Define initialValues with an empty object of the correct type
	const initialValues = {}

	return (
		<div className={css.formBg}>
			<button
				className={css.closeBtn}
				onClick={() => {
					setModalVisibility(false)
				}}
			>
				Close
			</button>
			<div className={css.formWrapper}>
				<Formik
					initialValues={initialValues}
					onSubmit={data => {
						console.log(data)
					}}
				>
					<Form className={css.form}>
						{fields.map(field => {
							console.log(field)

							return (
								<FormInput
									fieldTitle={field.name}
									fieldName={field.key}
									fieldType={field.type}
									fieldId={field.key}
									initialValue={field.initialValue}
									key={field.key}
								/>
							)
						})}
						<div className={css.btn}>
							<Button type='submit'>Зберегти</Button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	)
}

export default DynamicForm
