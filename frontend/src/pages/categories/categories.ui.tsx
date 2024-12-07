import { CategoriesContentWidget } from '@/widgets/categories-content'
import { CategoriesHeaderWidget } from '@/widgets/categories-header'
import { Box } from '@mantine/core'

export const CategoriesPage = () => {
	return (
		<Box>
			<CategoriesHeaderWidget />

			<CategoriesContentWidget />
		</Box>
	)
}
