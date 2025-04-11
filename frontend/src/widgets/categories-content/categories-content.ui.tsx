import {
	CategoriesSkeleton,
	Category,
	useGetCategories,
} from '@/entities/categories'
import { DeleteCategoryFeature } from '@/features/delete-category'
import { UpdateCategoryFeature } from '@/features/update-category'
import { Box, Flex, Text } from '@mantine/core'

export const CategoriesContentWidget = () => {
	const { categories, isFetching } = useGetCategories()

	if (isFetching) {
		return (
			<Box py={28} px={28}>
				<Box maw={500}>
					<CategoriesSkeleton />
				</Box>
			</Box>
		)
	}

	if (!categories) {
		return <Text>Что-то пошло не так!</Text>
	}

	return (
		<Box py={28}>
			<Flex direction="column" gap={16} maw={600}>
				{categories.length
					? categories.map((el) => (
							<Category
								key={el.id}
								data={el}
								deleteAction={<DeleteCategoryFeature categoryId={el.id} />}
								editAction={
									<UpdateCategoryFeature categoryId={el.id} name={el.name} />
								}
							/>
					  ))
					: null}
			</Flex>
		</Box>
	)
}
