import { OrdersTable, useGetOrders, useOrderStore } from '@/entities/orders'
import { useQueryParams } from '@/shared/lib/hooks'
import { CustomDrawer } from '@/shared/ui'
import { Box, Flex } from '@mantine/core'
import { OrderInfoWidget } from '../order-info/order-info.ui'
import { Order } from '@/shared/api/services'
import { useState } from 'react'
import { useUserStore } from '@/entities/auth'

export const OrdersTableWidget = () => {
	const { user } = useUserStore()
	const { getQueryParam, setQueryParams, removeQueryParam } = useQueryParams()
	const searchQuery = getQueryParam('search')
	const ordersPageQuery = getQueryParam('ordersPage')
	const categoryIdQuery = getQueryParam('categoryId')
	const materialIdQuery = getQueryParam('materialId')
	const layoutIdQuery = getQueryParam('layoutId')
	const priceFromQuery = getQueryParam('priceFrom')
	const priceToQuery = getQueryParam('priceTo')
	const [currentPage, setCurrentPage] = useState(
		ordersPageQuery ? Number(ordersPageQuery) : 1,
	)
	const { orders, totalPages, isFetching } = useGetOrders({
		page: currentPage,
		search: searchQuery,
		...(categoryIdQuery && { categoryId: Number(categoryIdQuery) }),
		...(materialIdQuery && { materialId: Number(materialIdQuery) }),
		...(layoutIdQuery && { layoutId: Number(layoutIdQuery) }),
		...(priceFromQuery && { priceFrom: Number(priceFromQuery) }),
		...(priceToQuery && { priceTo: Number(priceToQuery) }),
	})

	const { setDrawOpened, drawOpened } = useOrderStore()

	const handleClose = () => {
		removeQueryParam('orderId')
		setDrawOpened(false)
	}

	const handleRowClick = (data: Order) => {
		if (!user?.isAdmin) {
			setQueryParams({
				orderId: String(data.id),
			})
			setDrawOpened(true)
		}
	}

	const handleCurrentPage = (page: number) => {
		setCurrentPage(page)
		setQueryParams({
			ordersPage: String(page),
		})
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
					onChangePagination={handleCurrentPage}
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
