import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	BranchesService,
	CreateBranch,
	UpdateBrach,
} from '@/shared/api/services'
import { branchesQueryKeys } from './constants'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'

export const useGetBranches = (search: string = '') => {
	const { data, isFetching, isError } = useQuery({
		queryKey: branchesQueryKeys.allBranches(search),
		queryFn: () => BranchesService.getAll(search),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		branches: data?.data,
		isError,
		isFetching,
	}
}

export const useCreateBranchMutation = (
	onSuccess?: () => void,
	onError?: (err: string) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateBranch) => BranchesService.addBranch(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: branchesQueryKeys.allBranches() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			console.log(err.response)
			if (err.response?.data.errors) {
				console.log(err)
				onError?.('error')
			}
		},
	})
}

export const useDeleteBranch = (
	onSuccess?: () => void,
	onError?: () => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => BranchesService.deleteBranch(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: branchesQueryKeys.allBranches() })
			onSuccess?.()
		},
		onError,
	})
}

export const useUpdatedBranch = (
	onSuccess?: () => void,
	onError?: (errors: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: UpdateBrach) => BranchesService.updatedBranch(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: branchesQueryKeys.allBranches() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response.data.errors)
			}
		},
	})
}
