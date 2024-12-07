import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { CreateEmployee, Employee } from './types'

export class EmployeesService {
	static getAll(search?: string): Promise<AxiosResponse<Employee[]>> {
		return apiService.get<AxiosResponse<Employee[]>>('/auth/employees', {
			params: {
				search,
			},
		})
	}

	static addEmployee(data: CreateEmployee): Promise<AxiosResponse<Employee>> {
		return apiService.post<AxiosResponse<Employee>>('/auth/register', data)
	}
}
