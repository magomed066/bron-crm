import { MaterialsService } from '@/shared/api/services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { materialsQueryKeys } from './consts'
import { RequestError } from '@/shared/types'
import { AxiosError } from 'axios'

export const useGetMaterials = () => {
	const { data, isFetching, isError } = useQuery({
		queryKey: materialsQueryKeys.all(),
		queryFn: () => MaterialsService.getAll(),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		materials: data?.data,
		isError,
		isFetching,
	}
}

export const useAddMaterial = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (name: string) => MaterialsService.add(name),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: materialsQueryKeys.all() })
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

export const useDeleteMaterial = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => MaterialsService.remove(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: materialsQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}

export const useUpdateMaterial = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: { id: number; name: string }) =>
			MaterialsService.update(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: materialsQueryKeys.all() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}
