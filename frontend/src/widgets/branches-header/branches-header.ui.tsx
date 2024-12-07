import { AddBranchFeature } from '@/features/add-branch'
import { SearchBranchFeature } from '@/features/search-branch'
import { Box, Flex, Title } from '@mantine/core'

export const BranchesHeaderWidget = () => {
	return (
		<Flex align="center" justify="space-between">
			<Flex direction="column" gap={16}>
				<Title order={3}>Все филиалы</Title>
				<Box w={300}>
					<SearchBranchFeature />
				</Box>
			</Flex>

			<AddBranchFeature />
		</Flex>
	)
}
