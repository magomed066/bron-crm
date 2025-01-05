import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { Service } from './types'

export class ServicesService {
	static getAll(): Promise<AxiosResponse<Service[]>> {
		return apiService.get<AxiosResponse<Service[]>>('/services/all')
	}

	static remove(id: number) {
		return apiService.delete<AxiosResponse<Service[]>>(`/services/delete/${id}`)
	}

	static add(name: string) {
		return apiService.post(`/services/create`, {
			name,
		})
	}

	static update(data: { id: number; name: string }) {
		return apiService.post(`/services/update`, data)
	}
}
