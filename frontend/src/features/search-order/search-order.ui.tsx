import { CiSearch } from 'react-icons/ci'
import { Input } from '@mantine/core'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { useQueryParams } from '@/shared/lib/hooks'

export const SearchOrderFeature = () => {
	const { setQueryParams, removeQueryParam, getQueryParam } = useQueryParams()
	const defaultQuery = getQueryParam('search')
	const [query, setQuery] = useState(defaultQuery || '')

	const [debouncedValue] = useDebouncedValue(query, 1000)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		setQuery(value)
	}

	useEffect(() => {
		if (debouncedValue) {
			setQueryParams({
				search: debouncedValue,
			})
		} else {
			removeQueryParam('search')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue])

	return (
		<Input
			placeholder="Поиск заказа..."
			value={query}
			onChange={handleChange}
			leftSection={<CiSearch />}
		/>
	)
}
