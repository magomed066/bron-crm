import { Box, Title, Flex } from '@mantine/core'
import { AddOrderFeature } from '@/features/add-order'
import { SearchOrderFeature } from '@/features/search-order'

export const OrdersHeaderWidget = () => {
	return (
		<Flex align="flex-end" justify="space-between">
			<Flex direction="column" gap={16}>
				<Title order={3}>Все заказы</Title>
				<Box w={300}>
					<SearchOrderFeature />
				</Box>
			</Flex>

			<AddOrderFeature />
		</Flex>
	)
}
