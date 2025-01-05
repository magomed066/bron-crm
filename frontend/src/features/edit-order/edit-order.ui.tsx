import { CreateOrder } from '@/shared/api/services'
import {
	isValid,
	isValidNumber,
	mapDataForSelect,
	requiredValidate,
} from '@/shared/lib/helpers'
import {
	Button,
	Grid,
	NumberInput,
	Select,
	Switch,
	Textarea,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { FC, useEffect, useMemo, useState } from 'react'
import { Props } from './types'
import {
	ordersQueryKeys,
	useOrderStore,
	useUpdateOrderMutation,
} from '@/entities/orders'
import { notifications } from '@mantine/notifications'
import { useGetMaterials } from '@/entities/materials'
import { useGetCategories } from '@/entities/categories'
import { useGetLayouts } from '@/entities/layouts'
import { PhoneInput } from '@/shared/ui'
import { useQueryParams } from '@/shared/lib/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '@/entities/auth'

export const EditOrderFeature: FC<Props> = ({ data }) => {
	const { setDrawOpened } = useOrderStore()
	const { user } = useUserStore()
	const isAdmin = user?.isAdmin

	const client = useQueryClient()

	const { getQueryParam } = useQueryParams()
	const ordersPageQuery = getQueryParam('ordersPage')

	const { isFetching, materials } = useGetMaterials()
	const { isFetching: categoriesLoading, categories } = useGetCategories()
	const { isFetching: layoutsLoading, layouts } = useGetLayouts()

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

	const { mutate, isPending } = useUpdateOrderMutation(
		() => {
			client.invalidateQueries({
				queryKey: ordersQueryKeys.allOrders('', Number(ordersPageQuery)),
			})

			setDrawOpened(false)
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Заказы',
				message: 'Заказ успешно обновлен',
			})
		},
		(error) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Заказы',
				message: error.map((el) => el.message).join(','),
			})
		},
	)

	const [isGuarantee, setIsGuarantee] = useState(data?.isGuarantee)
	const form = useForm<CreateOrder>({
		mode: 'uncontrolled',
		initialValues: {
			product: data?.product || '',
			price: data?.price || 0,
			description: data?.description || '',
			materialId: data?.materialId || 0,
			categoryId: data?.categoryId || 0,
			layoutId: data?.layoutId || 0,
			phone: data?.phone || '',
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
		mutate({
			id: data.id,
			data: {
				...values,
				isGuarantee,
			},
		})
	})

	useEffect(() => {
		if (mappedMaterials.length > 0) {
			form.setFieldValue('materialId', String(data.materialId))
		}
	}, [mappedMaterials, data, form])

	useEffect(() => {
		if (mappedCategories.length > 0) {
			form.setFieldValue('categoryId', String(data.categoryId))
		}
	}, [mappedCategories, data, form])

	useEffect(() => {
		if (mappedLayouts.length > 0) {
			form.setFieldValue('layoutId', String(data.layoutId))
		}
	}, [mappedLayouts, data, form])

	return (
		<form onSubmit={handleSubmit}>
			<Grid mt={16}>
				<Grid.Col span={12}>
					<TextInput
						label="Наименование товара"
						key={form.key('product')}
						{...form.getInputProps('product')}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<NumberInput
						label="Цена за услугу"
						key={form.key('price')}
						{...form.getInputProps('price')}
						thousandSeparator=" "
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Select
						data={mappedMaterials}
						disabled={isFetching}
						label="Выберите материал"
						key={form.key('materialId')}
						{...form.getInputProps('materialId')}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Select
						label="Категория"
						data={mappedCategories}
						disabled={categoriesLoading}
						key={form.key('categoryId')}
						{...form.getInputProps('categoryId')}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Select
						label="Оформление"
						data={mappedLayouts}
						disabled={layoutsLoading}
						key={form.key('layoutId')}
						{...form.getInputProps('layoutId')}
					/>
				</Grid.Col>

				<Grid.Col span={12}>
					<PhoneInput
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

				<Grid.Col span={16} mt={16}>
					<Switch
						label="На гарантии"
						checked={isGuarantee}
						disabled={!isAdmin && !isGuarantee}
						onChange={(e) => setIsGuarantee(e.currentTarget.checked)}
					/>
				</Grid.Col>

				<Button
					mt={16}
					loading={isPending}
					disabled={isPending}
					className="ml-auto"
					type="submit"
					bg="primaryColor"
				>
					Сохранить
				</Button>
			</Grid>
		</form>
	)
}
