import { Branch } from '@/shared/api/services'

export type Props = {
	data: Branch[]
	isLoading: boolean
	onRowClick?: (data: Branch) => void
}
