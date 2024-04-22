import React from 'react'
import Dropdown, { Option } from 'react-dropdown'
import 'react-dropdown/style.css'
import { useSearchParams } from 'react-router-dom'
import css from './ChoiceField.module.css'

const ChoiceField = ({ options, onChange }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const defaultOption =
		options.find(option => option.value === searchParams.get('sort')) || ''

	const handleChange = e => {
		const value = e.value
		setSearchParams({ ...Object.fromEntries(searchParams), sort: value })
		onChange(value)
	}

	return (
		<Dropdown
			controlClassName={css.dropdown}
			arrowClassName={css.arrow}
			menuClassName={css.menu}
			options={options}
			onChange={handleChange}
			value={defaultOption}
			placeholder='Select an option'
		/>
	)
}

export default ChoiceField
