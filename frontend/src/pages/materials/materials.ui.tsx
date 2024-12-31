import { MaterialsContentWidget } from '@/widgets/materials-content'
import { MaterialsHeaderWidget } from '@/widgets/materials-header/materials-header.ui'
import { Container } from '@mantine/core'

export const MaterialsPage = () => {
	return (
		<Container>
			<MaterialsHeaderWidget />

			<MaterialsContentWidget />
		</Container>
	)
}
