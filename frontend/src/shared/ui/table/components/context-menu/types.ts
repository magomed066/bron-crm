import { TableContextMenu } from '@/shared/types/table'

export interface Props<T> {
	isShown: boolean
	top: number
	left: number
	items?: TableContextMenu<T>[]
	row?: T
}
