import { FC } from 'react'
import { Props } from './types'
import { UpdateBrach } from '@/shared/api/services'
import { useForm } from '@mantine/form'
import { isValid, requiredValidate } from '@/shared/lib/helpers'
import { Button, Flex, Grid, TextInput } from '@mantine/core'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { ModalType } from '@/shared/lib/config'
import { notifications } from '@mantine/notifications'
import { useUpdatedBranch } from '@/entities/branches'

export const EditBranchModalFeature: FC<Props> = ({
	branchId,
	address,
	name,
}) => {
	const { handleClose } = useModal({
		type: ModalType.EDIT_BRANCH,
	})
	const { mutate, isPending } = useUpdatedBranch(
		() => {
			handleClose()

			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Редактирование филиала',
				message: 'Филиал успешно изменен',
			})
		},
		(errors) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Редактирование филиала',
				message: errors.map((el) => el.message).join(','),
			})
		},
	)

	const form = useForm<UpdateBrach>({
		mode: 'uncontrolled',
		initialValues: {
			id: branchId,
			name,
			address,
		},
		validate: {
			name: (value) => isValid([requiredValidate('Заполните поле')], value),
			address: (value) => isValid([requiredValidate('Заполните поле')], value),
		},
	})

	const handleSubmit = form.onSubmit((values) => {
		mutate(values)
	})

	return (
		<form onSubmit={handleSubmit}>
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
