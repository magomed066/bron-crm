import { CategoriesSkeleton, Category } from '@/entities/categories'
import { useGetServices } from '@/entities/services'
import { DeleteServiceFeature } from '@/features/delete-service'
import { UpdateServiceFeature } from '@/features/update-service'
import { Box, Flex, Text } from '@mantine/core'

export const ServicesContentWidget = () => {
	const { services, isFetching } = useGetServices()

	if (isFetching) {
		return (
			<Box py={28} px={28}>
				<Box maw={500}>
					<CategoriesSkeleton />
				</Box>
			</Box>
		)
	}

	if (services === undefined) {
		return <Text>Что-то пошло не так!</Text>
	}

	if (services.length === 0) {
		return (
			<Box py={28} px={28}>
				<Box maw={500}>
					<Text>Добавьте услугу...</Text>
				</Box>
			</Box>
		)
	}

	return (
		<Box py={28}>
			<Flex direction="column" gap={16} maw={600}>
				{services.length
					? services.map((el) => (
							<Category
								key={el.id}
								data={el}
								deleteAction={<DeleteServiceFeature serviceId={el.id} />}
								editAction={
									<UpdateServiceFeature serviceId={el.id} name={el.name} />
								}
							/>
					  ))
					: null}
			</Flex>
		</Box>
	)
}
