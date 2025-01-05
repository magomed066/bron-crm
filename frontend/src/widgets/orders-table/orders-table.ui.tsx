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
	const ordersPageQuery = getQueryParam('ordersPage')
	const categoryIdQuery = getQueryParam('categoryId')
	const materialIdQuery = getQueryParam('materialId')
	const serviceIdIdQuery = getQueryParam('serviceId')
	const priceFromQuery = getQueryParam('priceFrom')
	const priceToQuery = getQueryParam('priceTo')
	const phoneQuery = getQueryParam('phone')
	const isGuaranteeQuery = getQueryParam('isGuarantee') || null
	const [currentPage, setCurrentPage] = useState(
		ordersPageQuery ? Number(ordersPageQuery) : 1,
	)
	const { orders, totalPages, isFetching } = useGetOrders({
		page: currentPage,
		search: searchQuery,
		...(categoryIdQuery && { categoryId: Number(categoryIdQuery) }),
		...(materialIdQuery && { materialId: Number(materialIdQuery) }),
		...(serviceIdIdQuery && { serviceId: Number(serviceIdIdQuery) }),
		...(priceFromQuery && { priceFrom: Number(priceFromQuery) }),
		...(priceToQuery && { priceTo: Number(priceToQuery) }),
		...(phoneQuery && { phone: phoneQuery }),
		...(isGuaranteeQuery && { isGuarantee: isGuaranteeQuery }),
	})

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
