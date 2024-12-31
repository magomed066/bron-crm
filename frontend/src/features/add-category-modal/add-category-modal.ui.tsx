import { useAddCategory } from '@/entities/categories'
import { ModalType } from '@/shared/lib/config'
import { isValid, requiredValidate } from '@/shared/lib/helpers'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { Button, Flex, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export const AddCategoryModalFeature = () => {
	const { handleClose } = useModal({
		type: ModalType.ADD_CATEGORY,
	})

	const { mutate, isPending } = useAddCategory(
		() => {
			handleClose()
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Добавление категории',
				message: 'Категория успешно добавлена',
			})
		},
		(errors) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Добавление категории',
				message: errors.map((el) => el.message).join(','),
			})
		},
	)

	const form = useForm<{ name: string }>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
		},
		validate: {
			name: (value) => isValid([requiredValidate('Заполните поле')], value),
		},
	})

	const handleSubmit = form.onSubmit((values) => {
		mutate(values.name)
	})

	return (
		<form onSubmit={handleSubmit}>
			<TextInput
				label="Название категории"
				key={form.key('name')}
				{...form.getInputProps('name')}
			/>

			<Flex align="center" gap={16} mt={16} justify="end">
				<Button
					variant="default"
					type="button"
					onClick={handleClose}
					disabled={isPending}
				>
					Отменить
				</Button>
				<Button
					bg="primaryColor"
					type="submit"
					loading={isPending}
					disabled={isPending}
				>
					Сохранить
				</Button>
			</Flex>
		</form>
	)
}
