import { OrdersHeaderWidget } from '@/widgets/orders-header'
import { OrdersTableWidget } from '@/widgets/orders-table'
import { Divider, Flex } from '@mantine/core'

export const OrdersPage = () => {
	return (
		<Flex direction="column" gap={16}>
			<OrdersHeaderWidget />
			<Divider />
			<OrdersTableWidget />
		</Flex>
	)
}
