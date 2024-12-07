import React, { Dispatch, SetStateAction } from 'react'
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

interface Props<T, K extends keyof T> {
	data: T[]
	columns: ColumnDef<T, K>[]
	pagination?: boolean
	filtering: string
	setGlobalFilter: Dispatch<SetStateAction<string>>
}

export const useTable = <T, K extends keyof T>({
	data,
	columns,
	pagination,
	filtering,
	setGlobalFilter,
}: Props<T, K>) => {
	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter: filtering,
		},
		onGlobalFilterChange: setGlobalFilter,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getCoreRowModel: getCoreRowModel(),
	})

	// Manage your own state
	const [state, setState] = React.useState(table.initialState)

	const [rowSelection, setRowSelection] = React.useState({})

	// Override the state managers for the table to your own
	table.setOptions((prev) => ({
		...prev,
		state: {
			...state,
			rowSelection,
		},
		onStateChange: setState,
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
		onRowSelectionChange: setRowSelection,
	}))

	return { state, table, row: table.getSelectedRowModel }
}
