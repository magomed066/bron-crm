import { Skeleton } from './components/skeleton'
import { EmptyData } from './components/empty-data'
import { Table } from './components/table'
import { TableProps } from '@/shared/types/table'

export const TableContainer = <T, K extends keyof T>({
	data,
	columns,
	pagination,
	onRowClick,
	contextMenu,
	loadMore,
	isLoading,
	emptyMessageLink,
	emptyMessageText,
	emptyMessageTitle = 'Нет данных',
	emptyMessageLinkText,
	isEnableLink = true,
	onRowDoubleClick,
}: TableProps<T, K>) => {
	if (isLoading) {
		return <Skeleton />
	}

	if (!data?.length) {
		return (
			<EmptyData
				emptyMessageLink={emptyMessageLink}
				emptyMessageText={emptyMessageText}
				emptyMessageTitle={emptyMessageTitle}
				emptyMessageLinkText={emptyMessageLinkText}
				isEnableLink={isEnableLink}
			/>
		)
	}

	return (
		// <div className="flex flex-col w-full">
		// <div className="overflow-x-auto">
		// <div className="w-full inline-block align-middle">

		<div className="overflow-hidden">
			<Table
				columns={columns}
				data={data}
				pagination={pagination}
				onRowClick={onRowClick}
				onRowDoubleClick={onRowDoubleClick}
				rowContextMenu={contextMenu}
				loadMore={loadMore}
			/>
		</div>
		// </div>
		// </div>
		// </div>
	)
}
