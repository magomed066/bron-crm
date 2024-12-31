import { MaterialsService } from '@/shared/api/services'
import { useQuery } from '@tanstack/react-query'
import { materialsQueryKeys } from './consts'

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
