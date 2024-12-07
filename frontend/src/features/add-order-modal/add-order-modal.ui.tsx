import { useCreateOrderMutation } from '@/entities/orders'
import { CreateOrder } from '@/shared/api/services'
import { ModalType } from '@/shared/lib/config'
import { isValid, isValidNumber, requiredValidate } from '@/shared/lib/helpers'
import { useModal } from '@/shared/lib/hooks/use-modal'
import {
	Button,
	Flex,
	Grid,
	NumberInput,
	Text,
	TextInput,
	Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export const AddOrderModalFeature = () => {
	const { handleClose } = useModal({
		type: ModalType.ADD_ORDER,
	})

	const { mutate, isPending } = useCreateOrderMutation(() => {
		handleClose()
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
		mutate(values)
	})

	return (
		<form onSubmit={handleSubmit}>
			<Text size="sm" c="secondaryColor">
				Заполните все поля, чтобы добавить заказ в систему
			</Text>
			<Grid mt={16}>
				<Grid.Col span={6}>
					<TextInput
						placeholder="Наименование товара"
						key={form.key('product')}
						{...form.getInputProps('product')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
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
