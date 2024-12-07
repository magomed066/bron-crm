import { Divider, Flex } from '@mantine/core'
import { BranchesHeaderWidget } from '@/widgets/branches-header'
import { BranchesListWidget } from '@/widgets/branches-list'

export const BranchesPage = () => {
	return (
		<Flex direction="column" gap={16}>
			<BranchesHeaderWidget />
			<Divider />
			<BranchesListWidget />
		</Flex>
	)
}
