import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { Material } from './types'

export class MaterialsService {
	static getAll(): Promise<AxiosResponse<Material[]>> {
		return apiService.get<AxiosResponse<Material[]>>('/materials/all')
	}

	static remove(id: number) {
		return apiService.delete<AxiosResponse<Material[]>>(
			`/materials/delete/${id}`,
		)
	}

	static add(name: string) {
		return apiService.post(`/materials/create`, {
			name,
		})
	}

	static update(data: { id: number; name: string }) {
		return apiService.post(`/materials/update`, data)
	}
}
