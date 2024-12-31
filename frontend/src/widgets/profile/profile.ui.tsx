import { UpdateProfileFeature } from '@/features/update-profile'
import {
	Button,
	Card,
	Divider,
	Grid,
	GridCol,
	PasswordInput,
	Title,
} from '@mantine/core'

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

			<Grid>
				<GridCol span={3}>
					<PasswordInput placeholder="Старый пароль" />
				</GridCol>
				<GridCol span={3}>
					<PasswordInput placeholder="Новый пароль" />
				</GridCol>
				<GridCol span={3}>
					<PasswordInput placeholder="Подтвердите пароль" />
				</GridCol>
			</Grid>

			<Button w={150} mt={24} variant="light">
				Сменить
			</Button>
		</Card>
	)
}
