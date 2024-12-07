import { useCreateBranchMutation } from '@/entities/branches'
import { CreateBranch } from '@/shared/api/services'
import { ModalType } from '@/shared/lib/config'
import { isValid, requiredValidate } from '@/shared/lib/helpers'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { Button, Flex, Grid, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export const AddBranchModalFeature = () => {
	const { mutateAsync, isPending } = useCreateBranchMutation()

	const form = useForm<CreateBranch>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			address: '',
		},
		validate: {
			name: (value) => isValid([requiredValidate('Заполните поле')], value),
			address: (value) => isValid([requiredValidate('Заполните поле')], value),
		},
	})

	const { handleClose } = useModal({
		type: ModalType.ADD_BRANCH,
	})

	const handleSubmit = form.onSubmit((values) => {
		mutateAsync(values).then(() => {
			handleClose()

			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Филиалы',
				message: 'Филиал успешно добавлен',
			})
		})
	})

	return (
		<form onSubmit={handleSubmit}>
			<Text size="sm" c="secondaryColor">
				Заполните все поля, чтобы добавить филиал в систему
			</Text>
			<Grid mt={16}>
				<Grid.Col span={12}>
					<TextInput
						placeholder="Наименование филиала"
						key={form.key('name')}
						{...form.getInputProps('name')}
					/>
				</Grid.Col>

				<Grid.Col span={12}>
					<TextInput
						placeholder="Адрес филиала"
						key={form.key('address')}
						{...form.getInputProps('address')}
					/>
				</Grid.Col>
			</Grid>

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
