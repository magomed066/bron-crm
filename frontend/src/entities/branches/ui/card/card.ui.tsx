import { Card, Divider, Flex, Text, Title } from '@mantine/core'
import React, { FC, Fragment } from 'react'
import { Props } from './types'

export const BranchCard: FC<Props> = ({ branch, actions }) => {
	return (
		<Card shadow="sm">
			<Flex align="center" gap={16}>
				<Flex direction="column" gap={4}>
					<Text tt="uppercase" c="dimmed" fw={700} size="xs">
						{branch.address}
					</Text>

					<Title order={4}>{branch.name}</Title>
				</Flex>

				<Flex className="ml-auto" align="center" gap={8}>
					{actions
						? actions.map((action, i) =>
								React.cloneElement(action, { key: `${branch.id}-${i}` }),
						  )
						: null}
				</Flex>
			</Flex>

			<Divider my={16} />

			<Text size="lg" fw="bold">
				Сотрудники:{' '}
				{!branch.users.length ? (
					<Text size="md" c="secondaryColor" className="inline">
						Отсутсвуют
					</Text>
				) : (
					''
				)}
			</Text>

			<Flex direction="column" mt={8}>
				{branch.users.map((user, i) => (
					<Fragment key={`${user.id}${i}`}>
						<Flex direction="column" gap={8}>
							<Flex align="center" gap={8}>
								<Text c="secondaryColor">Имя:</Text>
								<Text>
									{user.lastName} {user.firstName}
								</Text>
							</Flex>
							<Flex align="center" gap={8}>
								<Text c="secondaryColor">Email:</Text>
								<Text>{user.email}</Text>
							</Flex>
							<Flex align="center" gap={8}>
								<Text c="secondaryColor">Телефон:</Text>
								<Text>{user.phone || 'Отсутствует'}</Text>
							</Flex>
						</Flex>
						{i < branch.users.length - 1 ? <Divider my={8} w="30%" /> : null}
					</Fragment>
				))}
			</Flex>
		</Card>
	)
}
