import { useUpdateProfileMutation, useUserStore } from '@/entities/auth'
import { UpdateUser, User } from '@/shared/api/services'
import { isValid, isValidEmail, requiredValidate } from '@/shared/lib/helpers'
import { PhoneInput } from '@/shared/ui'
import { Button, Grid, GridCol, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

export const UpdateProfileFeature = () => {
	const { user, setUser } = useUserStore()

	const { mutateAsync, isPending } = useUpdateProfileMutation(
		() => {},
		(err) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Профиль',
				message: err.map((el) => el.message).join(','),
			})
		},
	)

	const form = useForm<UpdateUser>({
		mode: 'uncontrolled',
		initialValues: {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			phone: user?.phone || '',
			email: user?.email || '',
		},

		validate: {
			email: (value) =>
				isValid(
					[
						requiredValidate('Заполните поле'),
						isValidEmail('Введите корректный Email'),
					],
					value,
				),
			firstName: (value) =>
				isValid([requiredValidate('Поле не может быть пустым')], value),
			lastName: (value) =>
				isValid([requiredValidate('Поле не может быть пустым')], value),
			phone: (value) =>
				isValid([requiredValidate('Поле не может быть пустым')], value),
		},
	})

	const handleSubmit = form.onSubmit((values) => {
		mutateAsync(values).then((res) => {
			setUser(res.data as User)

			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Профиль',
				message: 'Профиль успешно обновлен',
			})
		})
	})

	return (
		<div className="flex flex-col">
			<Grid>
				<GridCol span={6}>
					<TextInput
						label="Имя"
						key={form.key('firstName')}
						{...form.getInputProps('firstName')}
					/>
				</GridCol>
				<GridCol span={6}>
					<TextInput
						label="Фамилия"
						key={form.key('lastName')}
						{...form.getInputProps('lastName')}
					/>
				</GridCol>
				<GridCol span={6}>
					<TextInput
						label="Email"
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
				</GridCol>
				<GridCol span={6}>
					<PhoneInput
						label="Телефон"
						key={form.key('phone')}
						{...form.getInputProps('phone')}
					/>
				</GridCol>
			</Grid>

			<Button
				loading={isPending}
				disabled={isPending}
				w={150}
				mt={24}
				variant="light"
				className="ml-auto"
				onClick={() => handleSubmit()}
			>
				Обновить
			</Button>
		</div>
	)
}
