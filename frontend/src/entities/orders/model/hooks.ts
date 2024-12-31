import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { CreateOrder, OrdersService, UpdatedOrder } from '@/shared/api/services'
import { ordersQueryKeys } from './constants'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'

export const useGetOrders = (search: string = '', page: number = 1) => {
	const { data, isFetching, isError } = useQuery({
		queryKey: ordersQueryKeys.allOrders(search, page), // Include page in the query key
		queryFn: () => OrdersService.getAll(search, page), // Pass page to the service function
		refetchOnWindowFocus: true,
		placeholderData: keepPreviousData,
		staleTime: 0,
	})

	return {
		orders: data?.data,
		total: data?.total,
		page: data?.page,
		totalPages: data?.totalPages,
		isError,
		isFetching,
	}
}

export const useGetOrderById = (id: number) => {
	const { data, isFetching, isError } = useQuery({
		queryKey: ordersQueryKeys.getOrderById(String(id)),
		queryFn: () => OrdersService.getById(id),
		refetchOnWindowFocus: true,
		staleTime: 0,
		enabled: Boolean(id),
	})

	return {
		order: data?.data,
		isError,
		isFetching,
	}
}

export const useCreateOrderMutation = (
	onSuccess?: () => void,
	onError?: (err: RequestError['errors']) => void,
) => {
	const client = useQueryClient()
	return useMutation({
		mutationFn: (data: CreateOrder) => OrdersService.create(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ordersQueryKeys.allOrders('', 1) })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response?.data.errors)
			}
		},
	})
}

export const useUpdateOrderMutation = (
	onSuccess?: () => void,
	onError?: (err: RequestError['errors']) => void,
) => {
	return useMutation({
		mutationFn: (data: UpdatedOrder) => OrdersService.update(data),
		onSuccess: () => {
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response?.data.errors)
			}
		},
	})
}
