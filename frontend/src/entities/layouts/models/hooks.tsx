import { ServicesService } from '@/shared/api/services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { servicesQueryKeys } from './consts'
import { RequestError } from '@/shared/types'
import { AxiosError } from 'axios'

export const useGetServices = () => {
	const { data, isFetching, isError } = useQuery({
		queryKey: servicesQueryKeys.all(),
		queryFn: () => ServicesService.getAll(),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		services: data?.data,
		isError,
		isFetching,
	}
}

export const useAddService = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (name: string) => ServicesService.add(name),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: servicesQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}

export const useDeleteService = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => ServicesService.remove(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: servicesQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}

export const useUpdateService = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: { id: number; name: string }) =>
			ServicesService.update(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: servicesQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}
