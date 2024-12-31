import { AddLayoutFeature } from '@/features/add-layout'
import { Box, Flex, Title } from '@mantine/core'

export const LayoutsHeaderWidget = () => {
	return (
		<Box>
			<Flex align="center" gap={16}>
				<Title order={3} c="dark">
					Оформление
				</Title>

				<AddLayoutFeature />
			</Flex>
		</Box>
	)
}
