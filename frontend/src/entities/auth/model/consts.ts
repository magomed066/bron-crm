import { UserLogin } from '@/shared/api/services'

export const AUTH_ACCESS_TOKEN_KEY = 'accessToken'
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken'

export const authQueryKeys = {
	register: () => ['register'],
	login: () => ['login'],
	employees: () => ['employees'],
	updateProfile: () => ['updateProfile'],
}

export const loginFormInitialValues: UserLogin = {
	email: '',
	password: '',
}

export const AuthErrMessages: Record<string, string> = {
	'Wrong password': 'Ваш пароль не верный. Введите верный пароль.',
	'User not found': 'Пользователь с таким Email не существует.',
}
