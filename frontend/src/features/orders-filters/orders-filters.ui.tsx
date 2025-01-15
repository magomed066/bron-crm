import { RiRestartLine } from 'react-icons/ri'

import { Box, Button, Flex, Input, NumberInput, Select } from '@mantine/core'
import { CiSearch } from 'react-icons/ci'
import { useOrdersFilters } from './hooks/filters'
import clsx from 'clsx'
import { PhoneInput } from '@/shared/ui'

export const OrdersFiltersFeature = () => {
	const {
		query,
		mappedCategories,
		mappedServices,
		categoriesFilter,
		servicesFilter,
		priceFilter,
		isGuaranteeFilter,
		isActiveReset,
		phone,
		handleIsGuarantee,
		handlePrice,
		handleCategories,
		handleReset,
		handleServices,
		handleChange,
		handleChangePhone,
	} = useOrdersFilters()

	return (
		<Flex align="flex-end" gap={16}>
			<Flex direction="column" gap={16}>
				<Flex align="center" gap={16} wrap="wrap" className="w-full">
					<Box className="md:w-[300px] w-full">
						<Input
							placeholder="Поиск заказа..."
							value={query}
							onChange={handleChange}
							leftSection={<CiSearch />}
						/>
					</Box>

					<Box className="md:w-[200px] w-full">
						<PhoneInput
							placeholder="Телефон"
							value={phone}
							onChange={handleChangePhone}
						/>
					</Box>

					<Box className="md:w-[200px] w-full">
						<Select
							clearable
							placeholder="Категория"
							data={mappedCategories}
							value={categoriesFilter}
							onChange={handleCategories}
						/>
					</Box>

					<Box className="md:w-[200px] w-full">
						<Select
							clearable
							placeholder="Услуга"
							data={mappedServices}
							value={servicesFilter}
							onChange={handleServices}
						/>
					</Box>
				</Flex>

				<Flex gap={16} wrap="wrap">
					<Flex align="center" gap={16} wrap="wrap">
						<Box className="md:w-[200px] w-full">
							<NumberInput
								value={priceFilter.priceFrom || ''}
								onChange={(e) => handlePrice('priceFrom', e)}
								placeholder="Цена от"
								thousandSeparator=" "
							/>
						</Box>

						<Box className="md:w-[200px] w-full">
							<NumberInput
								value={priceFilter.priceTo || ''}
								onChange={(e) => handlePrice('priceTo', e)}
								placeholder="Цена до"
								thousandSeparator=" "
							/>
						</Box>

						<Box className="md:w-[200px] w-full">
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
						</Box>
					</Flex>
					<Button
						variant="light"
						onClick={handleReset}
						disabled={!isActiveReset}
					>
						<RiRestartLine
							className={clsx(
								'mr-2',
								isActiveReset ? 'text-blue-500' : 'text-gray-400',
							)}
							size={16}
						/>
						Сбросить
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}
