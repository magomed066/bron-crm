import { RiRestartLine } from 'react-icons/ri'

import { Box, Button, Flex, Input, Select } from '@mantine/core'
import { CiSearch } from 'react-icons/ci'
import { useOrdersFilters } from './hooks/filters'

export const OrdersFiltersFeature = () => {
	const {
		query,
		mappedCategories,
		mappedLayouts,
		mappedMaterials,
		categoriesFilter,
		materialsFilter,
		layoutsFilter,
		handleMaterials,
		handleCategories,
		handleReset,
		handleLayouts,
		handleChange,
	} = useOrdersFilters()

	return (
		<Flex align="center" gap={16}>
			<Box w={300}>
				<Input
					placeholder="Поиск заказа..."
					value={query}
					onChange={handleChange}
					leftSection={<CiSearch />}
				/>
			</Box>

			<Select
				placeholder="Категория"
				data={mappedCategories}
				value={categoriesFilter}
				onChange={handleCategories}
			/>
			<Select
				placeholder="Материалы"
				data={mappedMaterials}
				value={materialsFilter}
				onChange={handleMaterials}
			/>
			<Select
				placeholder="Оформление"
				data={mappedLayouts}
				value={layoutsFilter}
				onChange={handleLayouts}
			/>

			<Button variant="light" onClick={handleReset}>
				<RiRestartLine className="text-blue-500 mr-2" size={16} />
				Сбросить
			</Button>
		</Flex>
	)
}
