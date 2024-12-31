import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { AllOrdersResponse, CreateOrder, Order, UpdatedOrder } from './types'

export class OrdersService {
	static getAll(search: string, page: number): Promise<AllOrdersResponse> {
		return apiService.get<AllOrdersResponse>('/orders/all', {
			params: {
				...(search && { search }),
				page,
				limit: 10,
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
