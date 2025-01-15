import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { Branch, CreateBranch, UpdateBrach } from './types'

export class BranchesService {
	static getAll(search?: string): Promise<AxiosResponse<Branch[]>> {
		return apiService.get<AxiosResponse<Branch[]>>('/branches/all', {
			params: search && {
				search,
			},
		})
	}

	static addBranch(data: CreateBranch) {
		return apiService.post('/branches/create', data)
	}

	static deleteBranch(id: number) {
		return apiService.delete(`/branches/delete/${id}`)
	}

	static updatedBranch(data: UpdateBrach) {
		return apiService.post('/branches/update', data)
	}
}
