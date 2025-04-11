import { AddMaterialFeature } from '@/features/add-material'
import { Flex, Title } from '@mantine/core'

export const MaterialsHeaderWidget = () => {
	return (
		<Flex align="center" gap={16}>
			<Title order={3} c="dark">
				Материалы
			</Title>

			<AddMaterialFeature />
		</Flex>
	)
}
