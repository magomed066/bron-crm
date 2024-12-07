import {
	CategoriesList,
	CategoriesSkeleton,
	useGetCategories,
} from '@/entities/categories'
import { DeleteCategoryFeature } from '@/features/delete-category'
import { Box, Text } from '@mantine/core'

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
		<Box py={28} px={28}>
			<Box maw={500}>
				<CategoriesList
					data={categories}
					actions={[<DeleteCategoryFeature />]}
				/>
			</Box>
		</Box>
	)
}
