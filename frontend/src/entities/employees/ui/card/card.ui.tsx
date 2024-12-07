import { FC } from 'react'
import { Props } from './types'
import { Avatar, Divider, Flex, Text } from '@mantine/core'

export const EmployeeCard: FC<Props> = ({ data }) => {
	return (
		<Flex
			key={data.id}
			align="center"
			gap={16}
			className="bg-white shadow rounded p-3"
		>
			<Avatar />

			<Flex direction="column">
				<Text size="sm" c="secondaryColor">
					ФИО
				</Text>
				<Text size="md">
					{data.lastName} {data.firstName}
				</Text>
			</Flex>

			<Divider orientation="vertical" />

			<Flex direction="column">
				<Text size="sm" c="secondaryColor">
					Email
				</Text>
				<Text size="md">{data.email}</Text>
			</Flex>

			<Divider orientation="vertical" />

			<Flex direction="column">
				<Text size="sm" c="secondaryColor">
					Телефон
				</Text>
				<Text size="md">{data.phone || 'Отсутствует'}</Text>
			</Flex>
		</Flex>
	)
}
