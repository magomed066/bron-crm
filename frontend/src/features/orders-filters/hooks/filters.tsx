import { useGetCategories } from '@/entities/categories'
import { useGetServices } from '@/entities/services'
import { useGetMaterials } from '@/entities/materials'
import { mapDataForSelect } from '@/shared/lib/helpers'
import { useQueryParams } from '@/shared/lib/hooks'
import { useDebouncedValue } from '@mantine/hooks'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

export const useOrdersFilters = () => {
	const { materials } = useGetMaterials()
	const { categories } = useGetCategories()
	const { services } = useGetServices()

	const { setQueryParams, getQueryParam, removeQueryParam, removeQueryParams } =
		useQueryParams()

	const categoryIdQuery = getQueryParam('categoryId') || null
	const materialIdQuery = getQueryParam('materialId') || null
	const serviceIdQuery = getQueryParam('serviceId') || null
	const priceFromQuery = getQueryParam('priceFrom') || null
	const priceToQuery = getQueryParam('priceTo') || null
	const isGuaranteeQuery = getQueryParam('isGuarantee') || null

	const defaultQuery = getQueryParam('search') || ''
	const defaultPhoneQuery = getQueryParam('phone') || ''

	const [query, setQuery] = useState(defaultQuery)
	const [phone, setPhone] = useState(defaultPhoneQuery)

	const [debouncedValue] = useDebouncedValue(query, 1000)
	const [debouncedPhoneValue] = useDebouncedValue(phone, 1000)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target

		setQuery(value)
	}

	const handleChangePhone = (value: string) => {
		setPhone(value)
	}

	const [materialsFilter, setMaterialsFilter] = useState<null | string>(
		materialIdQuery,
	)
	const [categoriesFilter, setCategoriesFilter] = useState<null | string>(
		categoryIdQuery,
	)
	const [servicesFilter, setServicesFilter] = useState<null | string>(
		serviceIdQuery,
	)
	const [isGuaranteeFilter, setIsGuaranteeFilter] = useState<null | string>(
		isGuaranteeQuery,
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

	const mappedServices = useMemo(() => {
		if (services) {
			return mapDataForSelect(services, 'name', 'id')
		}
		return []
	}, [services])

	const isActiveReset = useMemo(() => {
		return (
			isGuaranteeFilter ||
			materialsFilter ||
			servicesFilter ||
			categoriesFilter ||
			query ||
			priceFilter.priceFrom ||
			priceFilter.priceTo ||
			phone
		)
	}, [
		isGuaranteeFilter,
		materialsFilter,
		servicesFilter,
		categoriesFilter,
		query,
		priceFilter.priceFrom,
		priceFilter.priceTo,
		phone,
	])

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

	const handleServices = (value: string | null) => {
		setServicesFilter(value)

		if (value) {
			setQueryParams({
				serviceId: value,
			})

			return
		}
		removeQueryParam('serviceId')
	}

	const handleIsGuarantee = (value: string | null) => {
		setIsGuaranteeFilter(value)

		if (value) {
			setQueryParams({
				isGuarantee: value,
			})
			return
		}

		removeQueryParam('isGuarantee')
	}

	const handleReset = () => {
		removeQueryParams([
			'categoryId',
			'materialId',
			'serviceId',
			'search',
			'isGuarantee',
			'phone',
		])
		setCategoriesFilter(null)
		setServicesFilter(null)
		setMaterialsFilter(null)
		setIsGuaranteeFilter(null)
		setPhone('')
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
		if (debouncedPhoneValue) {
			setQueryParams({
				phone: debouncedPhoneValue,
			})
		} else {
			removeQueryParam('phone')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedPhoneValue])

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
		mappedServices,
		materialsFilter,
		servicesFilter,
		categoriesFilter,
		query,
		priceFilter,
		isGuaranteeFilter,
		isActiveReset,
		phone,

		handlePrice,
		setQuery,
		setPriceFilter,
		handleChange,
		handleReset,
		handleCategories,
		handleServices,
		handleMaterials,
		handleIsGuarantee,
		handleChangePhone,
	}
}
