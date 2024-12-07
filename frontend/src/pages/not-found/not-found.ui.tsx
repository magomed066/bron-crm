import { useNavigate } from 'react-router-dom'
import { Button, Container, Group, Text, Title } from '@mantine/core'
import styles from './index.module.css'

export const NotFound = () => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		navigate(-1)
	}

	return (
		<Container className="w-full h-screen flex flex-col items-center justify-center">
			<Title order={1}>404</Title>
			<Title order={2} mt={30}>
				Вы нашли секретное место.
			</Title>
			<Text
				c="color-tertiary"
				size="lg"
				mt={20}
				ta="center"
				className={styles.description}
			>
				К сожалению, это всего лишь страница 404. Возможно, вы ошиблись в вводе
				адреса или страница была перемещена на другой URL.
			</Text>
			<Group justify="center" mt={32}>
				<Button
					onClick={handleNavigate}
					type="button"
					size="md"
					className="bg-blue-700"
				>
					Вернуться назад
				</Button>
			</Group>
		</Container>
	)
}
