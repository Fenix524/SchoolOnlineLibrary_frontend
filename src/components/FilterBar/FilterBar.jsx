import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ChoiceField from '../FieldsFolder/ChoiceField/ChoiceField'
import SearchField from '../FieldsFolder/SearchField/SearchField'
import css from './FilterBar.module.css'

const FilterBar = props => {
	const [searchParams, setSearchParams] = useSearchParams()

	const options = [
		{ label: 'За назвою a-z', value: 'a-z' },
		{ label: 'За назвою z-a', value: 'z-a' },
	]

	const handleSearchChange = value => {
		setSearchParams({ ...Object.fromEntries(searchParams), search: value })
	}

	const handleSortChange = value => {
		setSearchParams({ ...Object.fromEntries(searchParams), order: value })
	}

	return (
		<div className={css.filterBox}>
			<div className={css.searchBox}>
				<SearchField onChange={handleSearchChange} />
			</div>
			<div className={css.selectBox}>
				<ChoiceField options={options} onChange={handleSortChange} />
			</div>
		</div>
	)
}

export default FilterBar
