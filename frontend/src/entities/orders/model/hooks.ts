import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateOrder, OrdersService, UpdatedOrder } from '@/shared/api/services'
import { ordersQueryKeys } from './constants'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'

export const useGetOrders = (search: string = '') => {
	const { data, isFetching, isError } = useQuery({
		queryKey: ordersQueryKeys.allOrders(search),
		queryFn: () => OrdersService.getAll(search),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		orders: data?.data,
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
			client.invalidateQueries({ queryKey: ordersQueryKeys.allOrders() })
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
	const client = useQueryClient()
	return useMutation({
		mutationFn: (data: UpdatedOrder) => OrdersService.update(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ordersQueryKeys.allOrders() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response?.data.errors)
			}
		},
	})
}
