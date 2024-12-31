import { LayoutsContentWidget } from '@/widgets/layouts-content'
import { LayoutsHeaderWidget } from '@/widgets/layouts-header'
import { Container } from '@mantine/core'

export const LayoutsPage = () => {
	return (
		<Container>
			<LayoutsHeaderWidget />
			<LayoutsContentWidget />
		</Container>
	)
}
