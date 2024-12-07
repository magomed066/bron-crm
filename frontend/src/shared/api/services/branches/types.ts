import { User } from '../auth/types'

export type Branch = {
	id: number
	name: string
	address: string
	users: Pick<User, 'firstName' | 'lastName' | 'phone' | 'id' | 'email'>[]
}

export type CreateBranch = Pick<Branch, 'name' | 'address'>
