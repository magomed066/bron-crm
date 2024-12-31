import { Order } from '@/shared/api/services'

export type Props = {
	data: Order[]
	isLoading: boolean
	onRowClick?: (data: Order) => void
	onChangePagination?: (value: number) => void
	activePage?: number
	paginationTotal?: number
}
