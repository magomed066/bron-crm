import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import { User, UserLogin } from './types'

export class AuthService {
	static login(data: UserLogin): Promise<AxiosResponse<User>> {
		return apiService.post<AxiosResponse<User>>('/auth/login', data, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
	}

	static getAllEmployees(): Promise<AxiosResponse<User[]>> {
		return apiService.get<AxiosResponse<User[]>>('/auth/employees')
	}
}
