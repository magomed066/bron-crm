import { EmployeeCard, useGetEmployees } from '@/entities/employees'
import { EditEMployeeBranchFeature } from '@/features/edit-employee-branch'
import { Center, Flex, Loader, Title } from '@mantine/core'

export const EmployeesListWidget = () => {
	const { employees, isFetching } = useGetEmployees()

	if (isFetching) {
		return <Loader className="mx-auto" />
	}

	if (employees === undefined) {
		return (
			<Center>
				<Title order={3}>Филиалов не найдено...</Title>
			</Center>
		)
	}

	if (employees.length === 0) {
		return (
			<Center>
				<Title order={3}>Филиалов не найдено...</Title>
			</Center>
		)
	}

	return (
		<Flex direction="column" gap={12} maw={1300} w="100%">
			{employees?.map((item) => (
				<EmployeeCard
					key={item.id}
					data={item}
					editAction={
						<EditEMployeeBranchFeature
							branchId={item.branchId}
							userId={item.id}
						/>
					}
				/>
			))}
		</Flex>
	)
}
