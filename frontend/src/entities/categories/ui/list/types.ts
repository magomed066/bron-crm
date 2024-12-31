import { Category } from '@/shared/api/services'
import { ReactElement, ReactNode } from 'react'

export type Props = {
	data: Category
	onEditClick?: (data: Category) => void
	deleteAction?: ReactElement
	editAction?: ReactNode
}
