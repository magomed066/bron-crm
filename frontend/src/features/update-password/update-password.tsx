import { useUpdatePasswordMutation } from '@/entities/auth'
import { UpdatePassword } from '@/shared/api/services'
import { isValid, requiredValidate } from '@/shared/lib/helpers'
import { Button, Grid, GridCol, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export const UpdatePasswordFeature = () => {
	const { mutate, isPending } = useUpdatePasswordMutation(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Смена пароля',
				message: 'Пароль успешно сменен',
			})
		},
		(err) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Смена пароля',
				message: err.map((el) => el.message).join(','),
			})
		},
	)

	const form = useForm<UpdatePassword & { confirmedNewPassword: string }>({
		mode: 'uncontrolled',
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmedNewPassword: '',
		},

		validate: {
			oldPassword: (value) =>
				isValid([requiredValidate('Поле не может быть пустым')], value),
			newPassword: (value) =>
				isValid([requiredValidate('Поле не может быть пустым')], value),
			confirmedNewPassword: (value) =>
				isValid([requiredValidate('Поле не может быть пустым')], value),
		},
	})

	const handleSubmit = form.onSubmit((values) => {
		const newPass = form.getValues().newPassword
		const confirmedNewPass = form.getValues().confirmedNewPassword

		if (newPass !== confirmedNewPass) {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Смена пароля',
				message:
					'Пароли в полях "Новый пароль" и "Подтвердите пароль" должны совпадать',
			})
			return
		}

		mutate({
			newPassword: values.newPassword,
			oldPassword: values.oldPassword,
		})
	})

	return (
		<>
			<Grid>
				<GridCol span={3}>
					<PasswordInput
						placeholder="Старый пароль"
						key={form.key('oldPassword')}
						{...form.getInputProps('oldPassword')}
					/>
				</GridCol>
				<GridCol span={3}>
					<PasswordInput
						placeholder="Новый пароль"
						key={form.key('newPassword')}
						{...form.getInputProps('newPassword')}
					/>
				</GridCol>
				<GridCol span={3}>
					<PasswordInput
						placeholder="Подтвердите пароль"
						key={form.key('confirmedNewPassword')}
						{...form.getInputProps('confirmedNewPassword')}
					/>
				</GridCol>
			</Grid>

			<Button
				loading={isPending}
				disabled={isPending}
				w={150}
				mt={24}
				variant="light"
				onClick={() => handleSubmit()}
			>
				Сменить
			</Button>
		</>
	)
}
