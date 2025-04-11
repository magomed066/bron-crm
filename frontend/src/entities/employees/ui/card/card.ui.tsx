import { FC, useState } from 'react'
import { Props } from './types'
import { ActionIcon, Avatar, Card, Divider, Flex, Text } from '@mantine/core'
import { FaPencilAlt } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'

export const EmployeeCard: FC<Props> = ({ data, editAction }) => {
	const [edit, setEdit] = useState(false)

	return (
		<Card shadow="sm" padding="md" radius="md" withBorder maw={600}>
			<Flex align="center" justify="space-between">
				<Flex align="center" gap={16}>
					<Avatar />
					<Text>Сотрудник</Text>
				</Flex>

				{edit ? (
					<ActionIcon color="whiteColor" onClick={() => setEdit(false)}>
						<MdOutlineCancel className="text-gray-600" size={24} />
					</ActionIcon>
				) : (
					<ActionIcon color="whiteColor" onClick={() => setEdit(true)}>
						<FaPencilAlt className="text-gray-600" />
					</ActionIcon>
				)}
			</Flex>

			<Flex gap={8} mt={16}>
				<Text size="md" c="secondaryColor">
					ФИО:
				</Text>
				<Text size="md">
					{data.lastName} {data.firstName}
				</Text>
			</Flex>

			<Divider my={8} />

			<Flex gap={8}>
				<Text size="md" c="secondaryColor">
					Email:
				</Text>
				<Text size="md">{data.email}</Text>
			</Flex>

			<Divider my={8} />

			<Flex gap={8}>
				<Text size="md" c="secondaryColor">
					Телефон:
				</Text>
				<Text size="md">{data.phone || 'Отсутствует'}</Text>
			</Flex>

			<Flex className="ml-auto" align="center" gap={16} mt={16}>
				{edit && editAction}
			</Flex>
		</Card>
		// <Flex
		// 	key={data.id}
		// 	align="center"
		// 	gap={16}
		// 	className="bg-white shadow rounded p-3"
		// >
		// 	<Avatar />

		// <Flex direction="column">
		// 	<Text size="sm" c="secondaryColor">
		// 		ФИО
		// 	</Text>
		// 	<Text size="md">
		// 		{data.lastName} {data.firstName}
		// 	</Text>
		// </Flex>

		// 	<Divider orientation="vertical" />

		// <Flex direction="column">
		// 	<Text size="sm" c="secondaryColor">
		// 		Email
		// 	</Text>
		// 	<Text size="md">{data.email}</Text>
		// </Flex>

		// 	<Divider orientation="vertical" />

		// 	<Flex direction="column">
		// <Text size="sm" c="secondaryColor">
		// 	Телефон
		// </Text>
		// <Text size="md">{data.phone || 'Отсутствует'}</Text>
		// 	</Flex>

		// <Flex className="ml-auto" align="center" gap={16}>
		// 	{edit && editAction}

		// 	{edit ? (
		// 		<ActionIcon color="whiteColor" onClick={() => setEdit(false)}>
		// 			<MdOutlineCancel className="text-gray-600" size={24} />
		// 		</ActionIcon>
		// 	) : (
		// 		<ActionIcon color="whiteColor" onClick={() => setEdit(true)}>
		// 			<FaPencilAlt className="text-gray-600" />
		// 		</ActionIcon>
		// 	)}
		// </Flex>
		// </Flex>
	)
}
