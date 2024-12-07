import { ProfileWidget } from '@/widgets/profile'
import { Container, Title } from '@mantine/core'

export const ProfilePage = () => {
	return (
		<Container>
			<Title order={3} mb={16}>
				Профиль пользователя
			</Title>

			<ProfileWidget />
		</Container>
	)
}
