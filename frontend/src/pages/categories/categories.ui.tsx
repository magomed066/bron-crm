import { CategoriesContentWidget } from '@/widgets/categories-content'
import { CategoriesHeaderWidget } from '@/widgets/categories-header'
import { Container } from '@mantine/core'

export const CategoriesPage = () => {
	return (
		<Container>
			<CategoriesHeaderWidget />

			<CategoriesContentWidget />
		</Container>
	)
}
