import { Flex, Text } from '@mantine/core'
import { TbDatabaseOff } from 'react-icons/tb'

export const EmptyState = () => {
	return (
		<Flex
			direction="column"
			justify="center"
			align="center"
			gap={8}
			p={4}
			mb={4}
		>
			<TbDatabaseOff size={32} className="text-gray-400" />
			<Text size={'lg'}>Нет данных</Text>
		</Flex>
	)
}
