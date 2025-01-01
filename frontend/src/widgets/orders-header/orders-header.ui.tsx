import { Title, Flex } from '@mantine/core'
import { AddOrderFeature } from '@/features/add-order'
import { useUserStore } from '@/entities/auth'
import { OrdersFiltersFeature } from '@/features/orders-filters'

export const OrdersHeaderWidget = () => {
	const { user } = useUserStore()
	return (
		<Flex align="flex-end" justify="space-between">
			<Flex direction="column" gap={16}>
				<Title order={3}>Все заказы</Title>
				<Flex align="center" gap={18}>
					<OrdersFiltersFeature />
				</Flex>
			</Flex>

			{!user?.isAdmin && <AddOrderFeature />}
		</Flex>
	)
}
