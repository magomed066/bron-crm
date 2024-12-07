import React, { FC } from 'react'
import { Props } from './types'
import { ActionIcon, Flex, Text } from '@mantine/core'
import { FaPencilAlt } from 'react-icons/fa'
import { EmptyState } from '@/shared/ui'

export const CategoriesList: FC<Props> = ({ data, onEditClick, actions }) => {
	if (!data.length) return <EmptyState />

	return (
		<Flex direction="column" gap={8}>
			{data.map((el) => (
				<Flex
					key={el.id}
					className="bg-white rounded-md"
					align="center"
					justify="space-between"
					p={12}
					px={12}
				>
					<Text size="md" fw={500}>
						{el.name}
					</Text>

					<Flex align="center" gap={8}>
						<ActionIcon
							variant="white"
							className="group"
							onClick={() => onEditClick?.(el)}
						>
							<FaPencilAlt className="text-gray-600 group-hover:text-gray-900 transition" />
						</ActionIcon>

						{actions
							? actions.map((action) =>
									React.cloneElement(action, { key: el.id, categoryId: el.id }),
							  )
							: null}
					</Flex>
				</Flex>
			))}
		</Flex>
	)
}
