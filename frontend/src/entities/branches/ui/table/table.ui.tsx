import { FC } from 'react'
import { Props } from './types'
import { TableContainer } from '@/shared/ui/table/table.ui'
import { ordersTableConfig } from '../../model/constants'

export const BranchesTable: FC<Props> = ({ data, isLoading, onRowClick }) => {
	return (
		<TableContainer
			columns={ordersTableConfig}
			data={data}
			isLoading={isLoading}
			emptyMessageTitle="Нет филиалов"
			pagination
			onRowClick={onRowClick}
		/>
	)
}
