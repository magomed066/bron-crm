import { AddServiceFeature } from '@/features/add-service'
import { Box, Flex, Title } from '@mantine/core'

export const ServicesHeaderWidget = () => {
	return (
		<Box>
			<Flex align="center" gap={16}>
				<Title order={3} c="dark">
					Услуги
				</Title>

				<AddServiceFeature />
			</Flex>
		</Box>
	)
}
