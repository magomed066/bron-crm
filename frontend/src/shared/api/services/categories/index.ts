import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { Category } from './types'

export class CategoriesService {
	static getAll(): Promise<AxiosResponse<Category[]>> {
		return apiService.get<AxiosResponse<Category[]>>('/categories/all')
	}

	static remove(id: number) {
		return apiService.delete<AxiosResponse<Category[]>>(
			`/categories/delete/${id}`,
		)
	}

	static update(data: { id: number; name: string }) {
		return apiService.post(`/categories/update`, data)
	}
}
