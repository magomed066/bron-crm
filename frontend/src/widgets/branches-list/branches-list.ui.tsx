import { BranchCard, useGetBranches } from '@/entities/branches'
import { DeleteBranchFeature } from '@/features/delete-branch'
import { EditBranchFeature } from '@/features/edit-branch'
import { useQueryParams } from '@/shared/lib/hooks'
import { Center, Flex, Loader, Title } from '@mantine/core'

export const BranchesListWidget = () => {
	const { getQueryParam } = useQueryParams()
	const searchQuery = getQueryParam('search')
	const { branches, isFetching } = useGetBranches(searchQuery)

	if (isFetching) {
		return <Loader className="mx-auto" />
	}

	if (branches === undefined) {
		return (
			<Center>
				<Title order={3}>Филиалов не найдено...</Title>
			</Center>
		)
	}

	if (branches.length === 0) {
		return (
			<Center>
				<Title order={3}>Филиалов не найдено...</Title>
			</Center>
		)
	}

	return (
		<Flex direction="column" gap={16} maw={900} w="100%" className="mx-auto">
			{branches.map((el) => (
				<BranchCard
					key={el.id}
					branch={el}
					actions={[
						<EditBranchFeature />,
						<DeleteBranchFeature branchId={el.id} />,
					]}
				/>
			))}
		</Flex>
	)
}
