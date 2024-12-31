import { CreateEmployee, EmployeesService } from '@/shared/api/services'
import { employeesQueryKeys } from './config'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { RequestError } from '@/shared/types'

export const useGetEmployees = (search?: string) => {
	const { data, isFetching, isError } = useQuery({
		queryKey: employeesQueryKeys.allEmployees(search),
		queryFn: () => EmployeesService.getAll(search),
		refetchOnWindowFocus: true,
		staleTime: 0,
	})

	return {
		employees: data?.data,
		isError,
		isFetching,
	}
}

export const useAddEmployeeMutation = (
	onSuccess?: () => void,
	onError?: (err: RequestError['errors']) => void,
) => {
	const client = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateEmployee) => EmployeesService.addEmployee(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: employeesQueryKeys.allEmployees() })
			onSuccess?.()
		},
		onError: (err: AxiosError<RequestError>) => {
			if (err.response?.data.errors) {
				onError?.(err.response?.data.errors)
			}
		},
	})
}
