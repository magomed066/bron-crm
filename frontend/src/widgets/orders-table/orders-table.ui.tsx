import { OrdersTable, useGetOrders, useOrderStore } from '@/entities/orders'
import { useQueryParams } from '@/shared/lib/hooks'
import { CustomDrawer } from '@/shared/ui'
import { Box, Flex } from '@mantine/core'
import { OrderInfoWidget } from '../order-info/order-info.ui'
import { Order } from '@/shared/api/services'
import { useState } from 'react'

export const OrdersTableWidget = () => {
	const { getQueryParam, setQueryParams, removeQueryParam } = useQueryParams()
	const searchQuery = getQueryParam('search')
	const [currentPage, setCurrentPage] = useState(1)
	const { orders, totalPages, isFetching } = useGetOrders(
		searchQuery,
		currentPage,
	)
	const { setDrawOpened, drawOpened } = useOrderStore()

	const handleClose = () => {
		removeQueryParam('orderId')
		setDrawOpened(false)
	}

	const handleRowClick = (data: Order) => {
		setQueryParams({
			orderId: String(data.id),
		})
		setDrawOpened(true)
	}

	return (
		<Box>
			<Flex direction="column" gap={16}>
				<OrdersTable
					onRowClick={handleRowClick}
					data={orders || []}
					isLoading={isFetching}
					activePage={currentPage}
					paginationTotal={totalPages}
					onChangePagination={setCurrentPage}
				/>
			</Flex>

			<CustomDrawer
				opened={drawOpened}
				onClose={handleClose}
				title="Информация о заказе"
			>
				<OrderInfoWidget />
			</CustomDrawer>
		</Box>
	)
}
