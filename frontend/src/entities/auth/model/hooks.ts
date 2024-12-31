import { useMutation } from '@tanstack/react-query'
import { AuthService, UpdateUser, User, UserLogin } from '@/shared/api/services'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'
import { AuthErrMessages } from './consts'

export const useLoginMutation = (
	onSuccess?: (data: User) => void,
	onError?: (err: string) => void,
) => {
	return useMutation({
		mutationFn: (data: UserLogin) => AuthService.login(data),
		onSuccess: async (res) => {
			onSuccess?.(res.data)
		},
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				onError?.(AuthErrMessages[err.response.data.error])
			}
		},
	})
}

export const useUpdateProfileMutation = (
	onSuccess?: (data: UpdateUser) => void,
	onError?: (err: string) => void,
) => {
	return useMutation({
		mutationFn: (data: UpdateUser) => AuthService.updateProfile(data),
		onSuccess: async (res) => {
			onSuccess?.(res.data)
		},
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				onError?.(AuthErrMessages[err.response.data.error])
			}
		},
	})
}
