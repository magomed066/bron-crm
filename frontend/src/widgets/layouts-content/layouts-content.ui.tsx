import { CategoriesSkeleton, Category } from '@/entities/categories'
import { useGetLayouts } from '@/entities/layouts'
import { DeleteLayoutFeature } from '@/features/delete-layout'
import { UpdateLayoutFeature } from '@/features/update-layout'
import { Box, Flex, Text } from '@mantine/core'

export const LayoutsContentWidget = () => {
	const { layouts, isFetching } = useGetLayouts()

	if (isFetching) {
		return (
			<Box py={28} px={28}>
				<Box maw={500}>
					<CategoriesSkeleton />
				</Box>
			</Box>
		)
	}

	if (!layouts) {
		return <Text>Что-то пошло не так!</Text>
	}

	return (
		<Box py={28}>
			<Flex direction="column" gap={16}>
				{layouts.length
					? layouts.map((el) => (
							<Category
								key={el.id}
								data={el}
								deleteAction={<DeleteLayoutFeature layoutId={el.id} />}
								editAction={
									<UpdateLayoutFeature layoutId={el.id} name={el.name} />
								}
							/>
					  ))
					: null}
			</Flex>
		</Box>
	)
}
