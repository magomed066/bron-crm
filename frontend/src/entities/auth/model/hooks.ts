import { useMutation } from '@tanstack/react-query'
import { AuthService, User, UserLogin } from '@/shared/api/services'
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
			if (err.response?.data.error) {
				onError?.(AuthErrMessages[err.response.data.error])
			}
		},
	})
}
