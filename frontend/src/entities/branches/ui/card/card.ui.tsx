import { Box, Card, Divider, Flex, Text, Title } from '@mantine/core'
import React, { FC } from 'react'
import { Props } from './types'

export const BranchCard: FC<Props> = ({ branch, actions }) => {
	return (
		<Card shadow="sm">
			<Flex align="center" gap={16}>
				<Box className="bg-slate-200 w-fit py-1 px-2">
					<Title order={4}>{branch.name}</Title>
				</Box>

				<Divider orientation="vertical" />

				<Text c="secondaryColor">{branch.address}</Text>

				<Flex className="ml-auto" align="center" gap={8}>
					{actions
						? actions.map((action) =>
								React.cloneElement(action, { key: branch.id }),
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
					<>
						<Flex key={user.id} direction="column" gap={8}>
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
					</>
				))}
			</Flex>
		</Card>
	)
}
