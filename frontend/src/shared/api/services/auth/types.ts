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

export type UpdateUser = Pick<
	User,
	'firstName' | 'lastName' | 'email' | 'phone'
>

export type UpdateUserResponse = {
	success: boolean
	data: UpdateUser
}

export type UpdatePassword = {
	oldPassword: string
	newPassword: string
}

export type UpdateEmployeeBranch = {
	id: number
	branchId: number
}

export type UpdatePasswordResponse = {
	success: boolean
}
