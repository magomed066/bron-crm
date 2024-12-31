import { User } from '../auth/types'

export type Employee = { branchId: number } & Pick<
	User,
	'id' | 'email' | 'firstName' | 'lastName' | 'phone'
>

export type CreateEmployee = Pick<
	User,
	'email' | 'firstName' | 'lastName' | 'phone' | 'isAdmin'
> & {
	password: string
	branchId: string
}
