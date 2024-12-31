import { CategoriesSkeleton, Category } from '@/entities/categories'
import { useGetMaterials } from '@/entities/materials'
import { DeleteMaterialFeature } from '@/features/delete-material'
import { UpdateMaterialFeature } from '@/features/update-material'
import { Box, Flex, Text } from '@mantine/core'

export const MaterialsContentWidget = () => {
	const { materials, isFetching } = useGetMaterials()

	if (isFetching) {
		return (
			<Box py={28} px={28}>
				<Box maw={500}>
					<CategoriesSkeleton />
				</Box>
			</Box>
		)
	}

	if (!materials) {
		return <Text>Что-то пошло не так!</Text>
	}

	return (
		<Box py={28}>
			<Flex direction="column" gap={16}>
				{materials.length
					? materials.map((el) => (
							<Category
								key={el.id}
								data={el}
								deleteAction={<DeleteMaterialFeature materialId={el.id} />}
								editAction={
									<UpdateMaterialFeature materialId={el.id} name={el.name} />
								}
							/>
					  ))
					: null}
			</Flex>
		</Box>
	)
}
