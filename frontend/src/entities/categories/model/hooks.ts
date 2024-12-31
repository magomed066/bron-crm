import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CategoriesService } from '@/shared/api/services'
import { categoriesQueryKeys } from './consts'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'

export const useGetCategories = () => {
	const { data, isFetching, isError } = useQuery({
		queryKey: categoriesQueryKeys.all(),
		queryFn: () => CategoriesService.getAll(),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		categories: data?.data,
		isError,
		isFetching,
	}
}

export const useDeleteCategory = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => CategoriesService.remove(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: categoriesQueryKeys.all() })
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

export const useUpdateCategory = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: { id: number; name: string }) =>
			CategoriesService.update(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: categoriesQueryKeys.all() })
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

export const useAddCategory = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (name: string) => CategoriesService.add(name),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: categoriesQueryKeys.all() })
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
