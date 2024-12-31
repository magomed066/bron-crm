import { AddCategoryFeature } from '@/features/add-category'
import { Box, Flex, Title } from '@mantine/core'

export const CategoriesHeaderWidget = () => {
	return (
		<Box>
			<Flex align="center" gap={16}>
				<Title order={3} c="dark">
					Категории
				</Title>

				<AddCategoryFeature />
			</Flex>
		</Box>
	)
}
