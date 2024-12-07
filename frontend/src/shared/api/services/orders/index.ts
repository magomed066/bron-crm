import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { CreateOrder, Order, UpdatedOrder } from './types'

export class OrdersService {
	static getAll(search: string): Promise<AxiosResponse<Order[]>> {
		return apiService.get<AxiosResponse<Order[]>>('/orders/all', {
			params: search && {
				search,
			},
		})
	}

	static getById(id: number): Promise<AxiosResponse<Order>> {
		return apiService.get<AxiosResponse<Order>>(`/orders/${id}`)
	}

	static create(data: CreateOrder) {
		return apiService.post('/orders/create', data)
	}

	static update(data: UpdatedOrder) {
		return apiService.post('/orders/update', data)
	}
}
