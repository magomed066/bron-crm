import { ServicesContentWidget } from '@/widgets/services-content'
import { ServicesHeaderWidget } from '@/widgets/services-header'
import { Container } from '@mantine/core'

export const ServicesPage = () => {
	return (
		<Container>
			<ServicesHeaderWidget />
			<ServicesContentWidget />
		</Container>
	)
}
