import { Order } from '@/shared/api/services'
import { priceFormatter } from '@/shared/lib/helpers'
import { Tooltip } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'

// export const ordersQueryKeys = {
// 	allOrders: (search?: string, page?: number) =>
// 		search ? ['allOrders', search, page] : ['allOrders', page],
// 	getOrderById: (id: string) => ['getOrderById', id],
// }

export const ordersQueryKeys = {
	allOrders: (
		search?: string,
		page?: number,
		filters?: Record<string, string>,
	) => {
		// Create a base key
		const key = ['allOrders', search, page]

		// Add any additional filters to the key
		return filters
			? [...key, ...Object.entries(filters).flatMap(([k, v]) => [k, v])]
			: key
	},
	getOrderById: (id: string) => ['getOrderById', id],
	getHints: (query: string) => ['hints', query],
}

export const ordersTableConfig: ColumnDef<Order>[] = [
	{
		id: '1',
		header: '№',
		accessorKey: 'id',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.id}</span>
		},
		maxSize: 20,
	},
	{
		id: '2',
		header: 'Наименование',
		accessorKey: 'product',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.product}</span>
		},
		maxSize: 20,
	},
	{
		id: '3',
		header: 'Описание',
		accessorKey: 'description',

		cell: (row) => {
			const { original } = row.cell.row

			const desc = original.description || ''
			const cutDesc = desc.length > 22 ? desc.slice(0, 20) + '...' : desc

			return (
				<Tooltip label={desc} withArrow position="top" offset={5}>
					<span>{cutDesc}</span>
				</Tooltip>
			)
		},
		maxSize: 20,
	},
	{
		id: '4',
		header: 'Телефон',
		accessorKey: 'phone',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.phone}</span>
		},
		maxSize: 20,
	},
	{
		id: '5',
		header: 'Категория',
		accessorKey: 'category',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.category.name}</span>
		},
		maxSize: 20,
	},
	{
		id: '6',
		header: 'Материал',
		accessorKey: 'material',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.material.name}</span>
		},
		maxSize: 20,
	},
	{
		id: '7',
		header: 'Оформление',
		accessorKey: 'layout',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.layout.name}</span>
		},
		maxSize: 20,
	},
	{
		id: '8',
		header: 'Цена ₽',
		accessorKey: 'price',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{priceFormatter.format(original.price)}</span>
		},
		maxSize: 20,
	},
	{
		id: '9',
		header: 'Гарантия',
		cell: (row) => {
			const { original } = row.cell.row

			return (
				<span
					className={clsx(
						original.isGuarantee ? 'text-green-600' : 'text-red-600',
					)}
				>
					{original.isGuarantee ? 'На гарантии' : 'Снято с гарантии'}
				</span>
			)
		},
		maxSize: 20,
	},
	{
		id: '10',
		header: 'Работник',
		accessorKey: 'user',

		cell: (row) => {
			const { original } = row.cell.row

			const fullName = `${original.user.lastName} ${original.user.firstName}`

			const cutName =
				fullName.length > 22 ? fullName.slice(0, 20) + '...' : fullName

			return (
				<Tooltip label={fullName} withArrow position="top" offset={5}>
					<span>{cutName}</span>
				</Tooltip>
			)
		},
		maxSize: 20,
	},
	{
		id: '11',
		header: 'Точка',
		accessorKey: 'price',

		cell: (row) => {
			const { original } = row.cell.row

			return <span>{original.branch.name}</span>
		},
		maxSize: 20,
	},
]
