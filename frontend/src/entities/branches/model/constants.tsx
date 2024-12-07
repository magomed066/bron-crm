import { Branch } from '@/shared/api/services'
// import { Tooltip } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'

export const branchesQueryKeys = {
	allBranches: (param?: string) =>
		param ? ['allBranches', param] : ['allBranches'],
}

export const ordersTableConfig: ColumnDef<Branch>[] = [
	{
		header: '№',
		accessorKey: 'id',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.id}</span>
		},
		maxSize: 20,
	},
	{
		header: 'Наименование',
		accessorKey: 'name',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.name}</span>
		},
		maxSize: 20,
	},
	{
		header: 'Адрес',
		accessorKey: 'address',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.address}</span>
		},
		maxSize: 20,
	},

	// {
	// 	header: 'Работник',
	// 	accessorKey: 'user',

	// 	cell: (row) => {
	// 		const { original } = row.cell.row

	// 		const fullName = `${original.user.firstName} ${original.user.lastName}`

	// 		const cutName =
	// 			fullName.length > 22 ? fullName.slice(0, 20) + '...' : fullName

	// 		return (
	// 			<Tooltip label={fullName} withArrow position="top" offset={5}>
	// 				<span>{cutName}</span>
	// 			</Tooltip>
	// 		)
	// 	},
	// 	maxSize: 20,
	// },
]
