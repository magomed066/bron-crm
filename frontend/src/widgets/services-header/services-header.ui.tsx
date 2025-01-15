import { AddServiceFeature } from '@/features/add-service'
import { Flex, Title } from '@mantine/core'

export const ServicesHeaderWidget = () => {
	return (
		<Flex align="center" gap={16}>
			<Title order={3} c="dark">
				Услуги
			</Title>

			<AddServiceFeature />
		</Flex>
	)
}
