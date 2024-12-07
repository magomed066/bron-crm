import { CreateOrder } from '@/shared/api/services'
import { isValid, isValidNumber, requiredValidate } from '@/shared/lib/helpers'
import {
	Button,
	Grid,
	NumberInput,
	Switch,
	Textarea,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { FC, useState } from 'react'
import { Props } from './types'
import { useOrderStore, useUpdateOrderMutation } from '@/entities/orders'
import { notifications } from '@mantine/notifications'

export const EditOrderFeature: FC<Props> = ({ data }) => {
	const { setDrawOpened } = useOrderStore()

	const { mutate, isPending } = useUpdateOrderMutation(
		() => {
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
		},
		validate: {
			product: (value) => isValid([requiredValidate('Заполните поле')], value),
			description: (value) =>
				isValid([requiredValidate('Заполните поле')], value),
			price: (value) =>
				isValid([isValidNumber('Заполните поле')], String(value)),
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

	return (
		<form onSubmit={handleSubmit}>
			<Grid mt={16}>
				<Grid.Col span={12}>
					<TextInput
						placeholder="Наименование товара"
						key={form.key('product')}
						{...form.getInputProps('product')}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<NumberInput
						placeholder="Цена за услугу"
						key={form.key('price')}
						{...form.getInputProps('price')}
						thousandSeparator=" "
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
