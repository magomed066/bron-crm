import { RiRestartLine } from 'react-icons/ri'

import { Box, Button, Flex, Input, NumberInput, Select } from '@mantine/core'
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
		priceFilter,
		isGuaranteeFilter,
		handleIsGuarantee,
		handleMaterials,
		handlePrice,
		handleCategories,
		handleReset,
		handleLayouts,
		handleChange,
	} = useOrdersFilters()

	return (
		<Flex align="flex-end" gap={16}>
			<Flex direction="column" gap={16}>
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
						clearable
						placeholder="Категория"
						data={mappedCategories}
						value={categoriesFilter}
						onChange={handleCategories}
					/>
					<Select
						clearable
						placeholder="Материалы"
						data={mappedMaterials}
						value={materialsFilter}
						onChange={handleMaterials}
					/>
					<Select
						clearable
						placeholder="Оформление"
						data={mappedLayouts}
						value={layoutsFilter}
						onChange={handleLayouts}
					/>
				</Flex>

				<Flex gap={16}>
					<Flex align="center" gap={16}>
						<NumberInput
							value={priceFilter.priceFrom || ''}
							onChange={(e) => handlePrice('priceFrom', e)}
							placeholder="Цена от"
							thousandSeparator=" "
						/>
						<NumberInput
							value={priceFilter.priceTo || ''}
							onChange={(e) => handlePrice('priceTo', e)}
							placeholder="Цена до"
							thousandSeparator=" "
						/>

						<Select
							placeholder="Гарантия"
							value={isGuaranteeFilter}
							onChange={handleIsGuarantee}
							clearable
							data={[
								{ value: 'false', label: 'Снято с гарантии' },
								{ value: 'true', label: 'На гарантии' },
							]}
						/>
					</Flex>
					<Button variant="light" onClick={handleReset}>
						<RiRestartLine className="text-blue-500 mr-2" size={16} />
						Сбросить
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}
