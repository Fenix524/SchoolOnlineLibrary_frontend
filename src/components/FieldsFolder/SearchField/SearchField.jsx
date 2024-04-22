import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import css from './SearchField.module.css'

const SearchField = ({ onChange }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [value, setValue] = React.useState(searchParams.get('search') || '')

	const handleChange = event => {
		setValue(event.target.value)
		setSearchParams({
			...Object.fromEntries(searchParams),
			search: event.target.value,
		})
		onChange(event.target.value)
	}

	return (
		<div className={css.wrapper}>
			<input
				className={css.searchField}
				type='text'
				placeholder='Пошук'
				value={value}
				onChange={handleChange}
			/>

			<FaSearch className={css.icon} size={25} />
		</div>
	)
}

export default SearchField
