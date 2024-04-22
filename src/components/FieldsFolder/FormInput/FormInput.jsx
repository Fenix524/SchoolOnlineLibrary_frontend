import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, useField } from 'formik'
import Select from 'react-select'
import clsx from 'clsx'
import css from './FormInput.module.css'

const FormInput = ({
	fieldTitle,
	fieldId,
	fieldName,
	fieldType = 'input',
	fieldContentType = 'text',
	options = [],
	initialValue = '',
}) => {
	const [field, meta, helpers] = useField(fieldName) // Отримуємо об'єкт поля форми та його метадані
	const { touched, error } = meta // Отримуємо інформацію про те, чи було торкання поля та чи є помилка

	const [choiceFieldValue, setChoiceFieldValue] = useState(
		initialValue || { value: '', label: '' }
	)

	useEffect(() => {
		setChoiceFieldValue(initialValue)
	}, [])

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			height: 50,
			width: '100%',
			borderRadius: 11,
			border: state.isFocused
				? '2px dashed #b8a382'
				: '1px solid rgba(0, 0, 0, 0.162)',
			boxShadow: state.isFocused ? null : null,
			'&:hover': {
				borderColor: state.isFocused ? null : '1px solid rgba(0, 0, 0, 0.162)',
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? '#b8a382' : null,
			color: state.isSelected ? '#ffffff' : '#000000',
			'&:hover': {
				backgroundColor: '#f0f0f0',
			},
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: '#000000',
		}),
	}

	const fieldClasses = clsx(css.fieldIndecator, {
		[css.error]: touched && error,
		[css.success]: touched && !error,
	})

	const handleChange = selectedOption => {
		setChoiceFieldValue(selectedOption) // Оновлюємо локальний стан
		helpers.setValue(selectedOption.value) // Оновлюємо значення поля форми, контрольованого Formik
	}

	return (
		<div className={css.wrapper}>
			<label className={css.title} htmlFor={fieldId}>
				{fieldTitle || 'Form field'}
			</label>
			<div className={css.fieldWraper}>
				{fieldType === 'select' ? (
					<>
						<Select
							className={`${css.selectField} ${css[fieldType]}`}
							options={options}
							name={fieldName}
							id={fieldId}
							value={choiceFieldValue}
							onChange={handleChange}
							styles={customStyles}
						/>
					</>
				) : (
					<Field
						className={`${css.inputField} ${css[fieldType]}`}
						name={fieldName}
						type={fieldContentType}
						id={fieldId}
						as={fieldType}
					/>
				)}
				<span className={fieldClasses}></span>
			</div>
			<ErrorMessage
				className={css.fieldError}
				name={fieldName}
				component='span'
			/>
		</div>
	)
}

export default FormInput
