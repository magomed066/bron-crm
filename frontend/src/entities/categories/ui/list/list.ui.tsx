import { FC, useState } from 'react'
import { Props } from './types'
import { ActionIcon, Flex, Text } from '@mantine/core'
import { FaPencilAlt } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

export const Category: FC<Props> = ({ data, editAction, deleteAction }) => {
	const [edit, setEdit] = useState(false)

	return (
		<Flex
			key={data.id}
			className="bg-white rounded-md"
			align="center"
			justify="space-between"
			p={12}
			px={12}
		>
			{edit ? (
				<Flex align="center" gap={8}>
					{editAction}
					<ActionIcon variant="white" onClick={() => setEdit(false)}>
						<MdOutlineCancel
							className="text-gray-600 group-hover:text-gray-900 transition"
							size={20}
						/>
					</ActionIcon>
				</Flex>
			) : (
				<Text size="md" fw={500} maw={230} className="truncate">
					{data.name}
				</Text>
			)}

			<Flex align="center" gap={8}>
				{editAction && (
					<ActionIcon
						variant="white"
						className="group"
						onClick={() => setEdit(true)}
					>
						<FaPencilAlt className="text-gray-600 group-hover:text-gray-900 transition" />
					</ActionIcon>
				)}

				{deleteAction}
			</Flex>
		</Flex>
	)
}
