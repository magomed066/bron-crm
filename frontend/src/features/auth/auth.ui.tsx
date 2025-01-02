import { useForm } from '@mantine/form'
import { loginFormInitialValues } from '@/entities/auth/model/consts'
import { UserLogin } from '@/shared/api/services'
import { isValid, isValidEmail, requiredValidate } from '@/shared/lib/helpers'
import { Button, Flex } from '@mantine/core'
import { Input, InputPassword } from '@/shared/ui'
import { useLoginMutation, useUserStore } from '@/entities/auth'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/shared/lib/config'

export const AuthFormFeature = () => {
	const form = useForm<UserLogin>({
		mode: 'uncontrolled',
		initialValues: loginFormInitialValues,

		validate: {
			email: (value) =>
				isValid(
					[
						requiredValidate('Заполните поле'),
						isValidEmail('Введите корректный Email'),
					],
					value,
				),

			password: (value) =>
				isValid([requiredValidate('Пароль не может быть пустым')], value),
		},
	})

	const navigate = useNavigate()

	const { setTokens, accessToken, setUser } = useUserStore()

	const { isPending, mutate } = useLoginMutation(
		(data) => {
			setUser(data)
			setTokens(data.accessToken, data.refreshToken)
		},
		(err) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Авторизация',
				message: err.map((el) => el.message).join(','),
			})
		},
	)

	const handleSubmit = form.onSubmit((values) => {
		mutate(values)
	})

	useEffect(() => {
		if (accessToken) {
			navigate(`${routes.orders}?ordersPage=1`)
		}
	}, [accessToken, navigate])

	return (
		<form onSubmit={handleSubmit}>
			<Flex direction="column" gap={20}>
				<Input
					placeholder="Введите email"
					type="email"
					key={form.key('email')}
					{...form.getInputProps('email')}
				/>

				<InputPassword
					placeholder="Введите пароль"
					key={form.key('password')}
					{...form.getInputProps('password')}
				/>

				<Button
					loading={isPending}
					disabled={isPending}
					bg="primaryColor"
					type="submit"
				>
					Войти
				</Button>
			</Flex>
		</form>
	)
}
