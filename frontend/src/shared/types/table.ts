import { ColumnDef } from '@tanstack/react-table'

export type TableColumn<T, K extends keyof T> = Array<ColumnDef<T, K>>

export interface TableContextMenu<T> {
	text: string
	handler: (record: T) => void
}
export interface TableProps<T, K extends keyof T> {
	columns: TableColumn<T, K>
	data: Array<T>
	pagination?: boolean
	loadMore?: boolean
	isLoading?: boolean
	onRowClick?: (row: T) => void
	onRowDoubleClick?: (row: T) => void
	contextMenu?: TableContextMenu<T>[]
	emptyMessageTitle?: string
	emptyMessageText?: string
	emptyMessageLink?: string
	emptyMessageLinkText?: string
	isEnableLink?: boolean
	onChangePagination?: (value: number) => void
	activePage?: number
	paginationTotal?: number
}
