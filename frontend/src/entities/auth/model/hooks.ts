import { useMutation } from '@tanstack/react-query'
import {
	AuthService,
	UpdatePassword,
	UpdateUser,
	User,
	UserLogin,
} from '@/shared/api/services'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'

export const useLoginMutation = (
	onSuccess?: (data: User) => void,
	onError?: (err: RequestError['errors']) => void,
) => {
	return useMutation({
		mutationFn: (data: UserLogin) => AuthService.login(data),
		onSuccess: async (res) => {
			onSuccess?.(res.data)
		},
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}

export const useUpdateProfileMutation = (
	onSuccess?: (data: UpdateUser) => void,
	onError?: (err: RequestError['errors']) => void,
) => {
	return useMutation({
		mutationFn: (data: UpdateUser) => AuthService.updateProfile(data),
		onSuccess: async (res) => {
			onSuccess?.(res.data)
		},
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}

export const useUpdatePasswordMutation = (
	onSuccess?: () => void,
	onError?: (err: RequestError['errors']) => void,
) => {
	return useMutation({
		mutationFn: (data: UpdatePassword) => AuthService.updatePassword(data),
		onSuccess,
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}
