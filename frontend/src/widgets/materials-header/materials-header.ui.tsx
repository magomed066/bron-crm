import { AddMaterialFeature } from '@/features/add-material'
import { Box, Flex, Title } from '@mantine/core'

export const MaterialsHeaderWidget = () => {
	return (
		<Box>
			<Flex align="center" gap={16}>
				<Title order={3} c="dark">
					Материалы
				</Title>

				<AddMaterialFeature />
			</Flex>
		</Box>
	)
}
