import { AuthFormFeature } from '@/features/auth'
import { Card, Flex, Title } from '@mantine/core'

export const AuthFormWidget = () => {
	return (
		<Flex direction="column" p={8} maw={400} w="100%">
			<Card shadow="md" radius={8}>
				<Title order={4} mb={20}>
					Войти в систему
				</Title>

				<AuthFormFeature />
			</Card>
		</Flex>
	)
}
