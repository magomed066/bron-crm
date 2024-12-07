import { AuthFormWidget } from '@/widgets/auth'
import { Flex } from '@mantine/core'

export const LoginPage = () => {
	return (
		<Flex
			h="100vh"
			align="center"
			justify="center"
			className="bg-slate-50 relative"
		>
			<AuthFormWidget />
		</Flex>
	)
}
