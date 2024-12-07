import { EmployeesHeaderWidget } from '@/widgets/employees-header'
import { EmployeesListWidget } from '@/widgets/employees-list'
import { Divider, Flex } from '@mantine/core'

export const EmployeesPage = () => {
	return (
		<Flex direction="column" gap={16}>
			<EmployeesHeaderWidget />
			<Divider />
			<EmployeesListWidget />
		</Flex>
	)
}
