import { useGetCategories } from '@/entities/categories'
import { useGetLayouts } from '@/entities/layouts'
import { useGetMaterials } from '@/entities/materials'
import { mapDataForSelect } from '@/shared/lib/helpers'
import { useQueryParams } from '@/shared/lib/hooks'
import { useDebouncedValue } from '@mantine/hooks'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

export const useOrdersFilters = () => {
	const { materials } = useGetMaterials()
	const { categories } = useGetCategories()
	const { layouts } = useGetLayouts()

	const { setQueryParams, getQueryParam, removeQueryParam, removeQueryParams } =
		useQueryParams()

	const categoryIdQuery = getQueryParam('categoryId') || null
	const materialIdQuery = getQueryParam('materialId') || null
	const layoutIdQuery = getQueryParam('layoutId') || null
	const priceFromQuery = getQueryParam('priceFrom') || null
	const priceToQuery = getQueryParam('priceTo') || null

	const defaultQuery = getQueryParam('search') || ''

	const [query, setQuery] = useState(defaultQuery)

	const [debouncedValue] = useDebouncedValue(query, 1000)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		setQuery(value)
	}

	const [materialsFilter, setMaterialsFilter] = useState<null | string>(
		materialIdQuery,
	)
	const [categoriesFilter, setCategoriesFilter] = useState<null | string>(
		categoryIdQuery,
	)
	const [layoutsFilter, setLayoutsFilter] = useState<null | string>(
		layoutIdQuery,
	)
	const [priceFilter, setPriceFilter] = useState({
		priceFrom: priceFromQuery,
		priceTo: priceToQuery,
	})

	const [debouncedPriceToValue] = useDebouncedValue(priceFilter.priceTo, 1000)
	const [debouncedPriceFromValue] = useDebouncedValue(
		priceFilter.priceFrom,
		1000,
	)

	const mappedMaterials = useMemo(() => {
		if (materials) {
			return mapDataForSelect(materials, 'name', 'id')
		}
		return []
	}, [materials])

	const mappedCategories = useMemo(() => {
		if (categories) {
			return mapDataForSelect(categories, 'name', 'id')
		}
		return []
	}, [categories])

	const mappedLayouts = useMemo(() => {
		if (layouts) {
			return mapDataForSelect(layouts, 'name', 'id')
		}
		return []
	}, [layouts])

	const handleMaterials = (value: string | null) => {
		setMaterialsFilter(value)

		if (value) {
			setQueryParams({
				materialId: value,
			})
			return
		}

		removeQueryParam('materialId')
	}
	const handleCategories = (value: string | null) => {
		setCategoriesFilter(value)

		if (value) {
			setQueryParams({
				categoryId: value,
			})

			return
		}
		removeQueryParam('categoryId')
	}

	const handleLayouts = (value: string | null) => {
		setLayoutsFilter(value)

		if (value) {
			setQueryParams({
				layoutId: value,
			})

			return
		}
		removeQueryParam('layoutId')
	}

	const handleReset = () => {
		removeQueryParams(['categoryId', 'materialId', 'layoutId', 'search'])
		setCategoriesFilter(null)
		setLayoutsFilter(null)
		setMaterialsFilter(null)
		setPriceFilter({
			priceFrom: '',
			priceTo: '',
		})
	}

	const handlePrice = (
		key: 'priceFrom' | 'priceTo',
		value: string | number,
	) => {
		setPriceFilter((prev) => ({ ...prev, [key]: value }))
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

	useEffect(() => {
		if (debouncedPriceToValue) {
			setQueryParams({
				priceTo: debouncedPriceToValue,
			})
		} else {
			removeQueryParam('priceTo')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedPriceToValue])

	useEffect(() => {
		if (debouncedPriceFromValue) {
			setQueryParams({
				priceFrom: debouncedPriceFromValue,
			})
		} else {
			removeQueryParam('priceFrom')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedPriceFromValue])

	useEffect(() => {
		if (!defaultQuery) {
			setQuery('')
		}
	}, [defaultQuery])

	return {
		mappedMaterials,
		mappedCategories,
		mappedLayouts,
		materialsFilter,
		layoutsFilter,
		categoriesFilter,
		query,
		priceFilter,

		handlePrice,
		setQuery,
		setPriceFilter,
		handleChange,
		handleReset,
		handleCategories,
		handleLayouts,
		handleMaterials,
	}
}
