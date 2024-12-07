import { useUserStore } from '@/entities/auth'
import {
	Button,
	Card,
	Divider,
	Grid,
	GridCol,
	PasswordInput,
	TextInput,
	Title,
} from '@mantine/core'

export const ProfileWidget = () => {
	const { user } = useUserStore()

	return (
		<Card p={24} shadow="xs">
			<Title order={5} c="secondaryColor" mb={16}>
				Персональные данные
			</Title>
			<Grid>
				<GridCol span={6}>
					<TextInput label="Имя" defaultValue={user?.firstName} />
				</GridCol>
				<GridCol span={6}>
					<TextInput label="Фамилия" defaultValue={user?.lastName} />
				</GridCol>
				<GridCol span={6}>
					<TextInput label="Email" defaultValue={user?.email} />
				</GridCol>
				<GridCol span={6}>
					<TextInput label="Телефон" defaultValue={user?.phone} />
				</GridCol>
			</Grid>

			<Button w={150} mt={24} variant="light" className="ml-auto">
				Обновить
			</Button>

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
