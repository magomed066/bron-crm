import { AxiosResponse } from 'axios'
import { apiService } from '../../base'
import {
	UpdateEmployeeBranch,
	UpdatePassword,
	UpdateUser,
	UpdateUserResponse,
	User,
	UserLogin,
} from './types'

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

	static updateProfile(data: UpdateUser): Promise<UpdateUserResponse> {
		return apiService.post<UpdateUserResponse>('/auth/update/profile', data)
	}

	static updatePassword(data: UpdatePassword): Promise<User> {
		return apiService.post<User>('/auth/update/password', data)
	}

	static updateEmployeeBranch(data: UpdateEmployeeBranch): Promise<User> {
		return apiService.post<User>('/auth/employees/update/branch', data)
	}
}
