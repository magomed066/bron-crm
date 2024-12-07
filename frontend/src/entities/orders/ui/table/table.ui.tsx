import { FC } from 'react'
import { Props } from './types'
import { TableContainer } from '@/shared/ui/table/table.ui'
import { ordersTableConfig } from '../../model/constants'

export const OrdersTable: FC<Props> = ({ data, isLoading, onRowClick }) => {
	return (
		<TableContainer
			columns={ordersTableConfig}
			data={data}
			isLoading={isLoading}
			emptyMessageTitle="Нет заказов"
			pagination
			onRowClick={onRowClick}
		/>
	)
}
