import { CategoriesSkeleton, Category } from '@/entities/categories'
import { useGetServices } from '@/entities/layouts'
import { DeleteServiceFeature } from '@/features/delete-service'
import { UpdateServiceFeature } from '@/features/update-layout'
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
			<Flex direction="column" gap={16}>
				{services.length
					? services.map((el) => (
							<Category
								key={el.id}
								data={el}
								deleteAction={<DeleteServiceFeature serviceId={el.id} />}
								editAction={
									<UpdateServiceFeature layoutId={el.id} name={el.name} />
								}
							/>
					  ))
					: null}
			</Flex>
		</Box>
	)
}
