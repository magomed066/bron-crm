import { LayoutsService } from '@/shared/api/services'
import { useQuery } from '@tanstack/react-query'
import { layoutsQueryKeys } from './consts'

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
