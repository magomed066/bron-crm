import { UpdatePasswordFeature } from '@/features/update-password'
import { UpdateProfileFeature } from '@/features/update-profile'
import { Card, Divider, Title } from '@mantine/core'

export const ProfileWidget = () => {
	return (
		<Card p={24} shadow="xs">
			<Title order={5} c="secondaryColor" mb={16}>
				Персональные данные
			</Title>
			<UpdateProfileFeature />

			<Divider my={24} />

			<Title order={5} c="secondaryColor" mb={16}>
				Сменить пароль
			</Title>

			<UpdatePasswordFeature />
		</Card>
	)
}
