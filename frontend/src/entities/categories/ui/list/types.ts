import { Category } from '@/shared/api/services'
import { ReactElement } from 'react'

export type Props = {
	data: Category[]
	onEditClick?: (data: Category) => void
	actions?: ReactElement[]
}
