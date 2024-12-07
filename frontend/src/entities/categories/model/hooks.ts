import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CategoriesService } from '@/shared/api/services'
import { categoriesQueryKeys } from './consts'

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
	onError?: () => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => CategoriesService.remove(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: categoriesQueryKeys.all() })
			onSuccess?.()
		},
		onError,
	})
}
