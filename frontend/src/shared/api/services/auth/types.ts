export type User = {
	id: number
	firstName: string
	lastName: string
	email: string
	phone: string
	accessToken: string
	refreshToken: string
	isAdmin: boolean
}

export type UserLogin = Pick<User, 'email'> & {
	password: string
}
