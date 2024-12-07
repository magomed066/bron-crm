import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { Container } from '@mantine/core'

export const BaseLayout = () => {
	return (
		<div className="min-h-screen bg-slate-50">
			<Header />

			<div className="mt-4">
				<Container fluid pb={32}>
					<Outlet />
				</Container>
			</div>
		</div>
	)
}
