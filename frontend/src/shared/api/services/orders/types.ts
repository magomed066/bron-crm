import { User } from '../auth/types'
import { Branch } from '../branches/types'

export type Order = {
	id: number
	product: string
	description: string
	price: number
	user: Pick<User, 'firstName' | 'lastName' | 'phone' | 'isAdmin'>
	branch: Branch
	createdAt: string
	isGuarantee: boolean
}

export type CreateOrder = Pick<Order, 'product' | 'description' | 'price'>

export type UpdatedOrder = {
	id: number
	data: Pick<Order, 'product' | 'description' | 'price' | 'isGuarantee'>
}
