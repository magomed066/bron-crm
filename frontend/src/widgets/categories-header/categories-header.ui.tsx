import { ActionIcon, Box, Flex, Title } from '@mantine/core'
import { FaPlus } from 'react-icons/fa'

export const CategoriesHeaderWidget = () => {
	return (
		<Box>
			<Flex align="center" gap={16}>
				<Title order={3} c="dark">
					Категории
				</Title>

				<ActionIcon variant="default" size={32} color="gray">
					<FaPlus />
				</ActionIcon>
			</Flex>
		</Box>
	)
}
