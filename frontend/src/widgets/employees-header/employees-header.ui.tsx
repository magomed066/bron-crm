import { AddEmployeeFeature } from '@/features/add-employee'
import { Box, Flex, Input, Title } from '@mantine/core'
import { CiSearch } from 'react-icons/ci'

export const EmployeesHeaderWidget = () => {
	return (
		<Flex align="flex-end" justify="space-between">
			<Flex direction="column" gap={16}>
				<Title order={3}>Все сотрудники</Title>
				<Box w={300}>
					<Input placeholder="Поиск сотрудника..." leftSection={<CiSearch />} />
					{/* <SearchBranchFeature /> */}
				</Box>
			</Flex>

			<AddEmployeeFeature />
		</Flex>
	)
}
