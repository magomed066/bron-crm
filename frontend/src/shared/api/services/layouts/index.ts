import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { Layout } from './types'

export class LayoutsService {
	static getAll(): Promise<AxiosResponse<Layout[]>> {
		return apiService.get<AxiosResponse<Layout[]>>('/layouts/all')
	}

	static remove(id: number) {
		return apiService.delete<AxiosResponse<Layout[]>>(`/layouts/delete/${id}`)
	}

	static add(name: string) {
		return apiService.post(`/layouts/create`, {
			name,
		})
	}

	static update(data: { id: number; name: string }) {
		return apiService.post(`/layouts/update`, data)
	}
}
