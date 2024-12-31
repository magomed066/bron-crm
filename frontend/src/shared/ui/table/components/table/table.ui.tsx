import { useState } from 'react'
import { TableProps } from './types'
import { table as tableEL } from './config'
import { useContextTableMenu, useTable } from '../../hooks'
import { ContextMenu } from '../context-menu'
import { TableBody } from '../table-body'
import { TableHead } from '../table-head'
import { Pagination } from '@mantine/core'

export const Table = <T, K extends keyof T>({
	data = [],
	columns = [],
	className,
	pagination,
	rowContextMenu,
	onRowClick,
	onRowDoubleClick,
	paginationTotal,
	onChangePagination,
	activePage,
}: TableProps<T, K>) => {
	const [globalFilter, setGlobalFilter] = useState('')

	// Define React Table
	const { table } = useTable({
		data,
		columns,
		setGlobalFilter,
		filtering: globalFilter,
	})

	// Context
	const { handleContextMenu, anchorPoint, isShown, row } =
		useContextTableMenu<T>()

	// Table Data
	const dataSource = table.getRowModel().rows
	const columnsData = table.getHeaderGroups()

	return (
		<div className="w-full overflow-x-auto overflow-hidden rounded-lg">
			<table className={tableEL({ className })}>
				<TableHead columns={columnsData} />
				<TableBody
					data={dataSource}
					onRowClick={onRowClick}
					onRowDoubleClick={onRowDoubleClick}
					onRowContextMenu={handleContextMenu}
				/>
			</table>

			<ContextMenu
				top={anchorPoint.y}
				left={anchorPoint.x}
				isShown={isShown}
				items={rowContextMenu}
				row={row}
			/>

			{pagination && (
				<Pagination
					mt={16}
					total={paginationTotal || 0}
					value={activePage}
					onChange={onChangePagination}
					color="primaryColor"
				/>
			)}
		</div>
	)
}

export default Table
