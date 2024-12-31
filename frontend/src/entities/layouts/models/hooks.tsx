import { LayoutsService } from '@/shared/api/services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { layoutsQueryKeys } from './consts'
import { RequestError } from '@/shared/types'
import { AxiosError } from 'axios'

export const useGetLayouts = () => {
	const { data, isFetching, isError } = useQuery({
		queryKey: layoutsQueryKeys.all(),
		queryFn: () => LayoutsService.getAll(),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		layouts: data?.data,
		isError,
		isFetching,
	}
}

export const useAddLayout = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (name: string) => LayoutsService.add(name),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: layoutsQueryKeys.all() })
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

export const useDeleteLayout = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => LayoutsService.remove(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: layoutsQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}

export const useUpdateLayout = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: { id: number; name: string }) =>
			LayoutsService.update(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: layoutsQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}
