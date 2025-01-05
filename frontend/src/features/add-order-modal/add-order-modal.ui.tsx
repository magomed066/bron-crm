import { useEffect, useMemo, useState } from 'react'
import { useGetCategories } from '@/entities/categories'
import { useGetLayouts } from '@/entities/layouts'
import { useGetMaterials } from '@/entities/materials'
import {
	ordersQueryKeys,
	useCreateOrderMutation,
	useGetOrderHints,
} from '@/entities/orders'
import { CreateOrder } from '@/shared/api/services'
import { ModalType } from '@/shared/lib/config'
import {
	isValid,
	isValidNumber,
	mapDataForSelect,
	requiredValidate,
} from '@/shared/lib/helpers'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { PhoneInput } from '@/shared/ui'
import {
	Button,
	Flex,
	Grid,
	NumberInput,
	Select,
	Text,
	Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryParams } from '@/shared/lib/hooks'
import { AsyncAutocomplete } from '@/shared/ui/autocomplete/autocomplete.ui'
import { useDebouncedValue } from '@mantine/hooks'

export const AddOrderModalFeature = () => {
	const { handleClose } = useModal({
		type: ModalType.ADD_ORDER,
	})

	const client = useQueryClient()

	const { getQueryParam } = useQueryParams()
	const ordersPageQuery = getQueryParam('ordersPage')

	const { isFetching, materials } = useGetMaterials()
	const { isFetching: categoriesLoading, categories } = useGetCategories()
	const { isFetching: layoutsLoading, layouts } = useGetLayouts()

	const [productName, setProductName] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [debouncedProductValue] = useDebouncedValue(inputValue, 1000)
	const [empty, setEmpty] = useState(false)

	const { hints, isFetching: isHintsLoading } = useGetOrderHints(
		debouncedProductValue,
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

	const { mutate, isPending } = useCreateOrderMutation(() => {
		handleClose()

		client.invalidateQueries({
			queryKey: ordersQueryKeys.allOrders('', Number(ordersPageQuery)),
		})

		notifications.show({
			color: 'green',
			autoClose: 2500,
			title: 'Заказы',
			message: 'Заказ успешно добавлен',
		})
	})

	const form = useForm<CreateOrder>({
		mode: 'uncontrolled',
		initialValues: {
			product: '',
			price: 0,
			description: '',
			materialId: 0,
			categoryId: 0,
			layoutId: 0,
			phone: '',
		},
		validate: {
			product: (value) => isValid([requiredValidate('Заполните поле')], value),
			price: (value) =>
				isValid([isValidNumber('Заполните поле')], String(value)),
			materialId: (value) =>
				isValid([isValidNumber('Заполните поле')], String(value)),
			layoutId: (value) =>
				isValid([isValidNumber('Заполните поле')], String(value)),
			categoryId: (value) =>
				isValid([isValidNumber('Заполните поле')], String(value)),

			phone: (value) => isValid([requiredValidate('Заполните поле')], value),
		},
	})

	const handleSubmit = form.onSubmit((values) => {
		mutate(values)
	})

	useEffect(() => {
		if (hints && hints.length === 0) {
			setEmpty(true)
		}
	}, [hints])

	useEffect(() => {
		if (isHintsLoading && hints) {
			if (productName) {
				form.setFieldValue('product', productName)
			} else {
				form.setFieldValue('product', inputValue)
			}
		}
	}, [hints, isHintsLoading, form, inputValue, productName])

	return (
		<form onSubmit={handleSubmit}>
			<Text size="sm" c="secondaryColor">
				Заполните все поля, чтобы добавить заказ в систему
			</Text>
			<Grid mt={16} gutter={10}>
				<Grid.Col span={6}>
					<AsyncAutocomplete
						label="Наименование товара"
						data={hints || []}
						value={productName}
						error={form.getInputProps('product').error}
						onSelect={(value) => {
							setProductName(value)
							setEmpty(false)
						}}
						loading={isHintsLoading}
						empty={empty}
						onChange={(value) => {
							setInputValue(value)
							setProductName(value)

							if (value.trim() === '') {
								setEmpty(true)
							}
						}}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<NumberInput
						required
						label="Цена за услугу"
						key={form.key('price')}
						{...form.getInputProps('price')}
						thousandSeparator=" "
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						required
						data={mappedMaterials}
						disabled={isFetching}
						label="Выберите материал"
						key={form.key('materialId')}
						{...form.getInputProps('materialId')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						required
						label="Категория"
						data={mappedCategories}
						disabled={categoriesLoading}
						key={form.key('categoryId')}
						{...form.getInputProps('categoryId')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						required
						label="Оформление"
						data={mappedLayouts}
						disabled={layoutsLoading}
						key={form.key('layoutId')}
						{...form.getInputProps('layoutId')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<PhoneInput
						required
						label="Телефон"
						key={form.key('phone')}
						{...form.getInputProps('phone')}
					/>
				</Grid.Col>

				<Grid.Col span={12}>
					<Textarea
						placeholder="Описание к заказу"
						autosize
						minRows={5}
						key={form.key('description')}
						{...form.getInputProps('description')}
					/>
				</Grid.Col>
			</Grid>

			<Flex align="center" gap={16} mt={16} justify="end">
				<Button type="button" variant="default" onClick={handleClose}>
					Отменить
				</Button>
				<Button
					type="submit"
					bg="primaryColor"
					loading={isPending}
					disabled={isPending}
				>
					Сохранить
				</Button>
			</Flex>
		</form>
	)
}
