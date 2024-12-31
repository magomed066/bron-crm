import { User } from '../auth/types'
import { Branch } from '../branches/types'
import { Category } from '../categories/types'
import { Layout } from '../layouts/types'
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
	layout: Layout
}

export type CreateOrder = Pick<
	Order,
	'product' | 'description' | 'price' | 'phone'
> & {
	materialId: number
	categoryId: number
	layoutId: number
}

export type UpdatedOrder = {
	id: number
	data: Pick<Order, 'product' | 'description' | 'price' | 'isGuarantee'>
}
