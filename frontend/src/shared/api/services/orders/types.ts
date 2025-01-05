import { User } from '../auth/types'
import { Branch } from '../branches/types'
import { Category } from '../categories/types'
import { Service } from '../services/types'
import { Material } from '../materials/types'

export type Order = {
	id: number
	product: string
	description: string
	price: number
	user: Pick<User, 'firstName' | 'lastName' | 'phone' | 'isAdmin'>
	branch: Branch
	createdAt: string
	phone: string
	isGuarantee: boolean
	category: Category
	material: Material
	service: Service
	materialId: number
	categoryId: number
	serviceId: number
}

export type CreateOrder = Pick<
	Order,
	'product' | 'description' | 'price' | 'phone'
> & {
	categoryId: number | string
	serviceId: number | string
}

export type UpdatedOrder = {
	id: number
	data: Pick<Order, 'product' | 'description' | 'price' | 'isGuarantee'>
}

export type AllOrdersResponse = {
	data: Order[]
	total: number
	page: number
	totalPages: number
}
