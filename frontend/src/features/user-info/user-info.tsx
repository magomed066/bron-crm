import { useState } from 'react'
import { Menu, Flex, Avatar, UnstyledButton, Text } from '@mantine/core'
import { IoLogOutOutline } from 'react-icons/io5'
import { IoSettingsOutline } from 'react-icons/io5'
import { useUserStore } from '@/entities/auth'
import { NavLink } from 'react-router-dom'
import { routes } from '@/shared/lib/config'

export const UserInfoFeature = () => {
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const { logout, user } = useUserStore()

	return (
		<Menu
			width={260}
			position="bottom-end"
			transitionProps={{ transition: 'pop-top-right' }}
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			withinPortal
		>
			<Menu.Target>
				<UnstyledButton
					className={`flex items-center gap-2 p-3 px-2 py-1 rounded-sm transition-colors duration-100 ${
						userMenuOpened
							? 'bg-gray-100 dark:bg-gray-700'
							: 'hover:bg-white dark:hover:bg-gray-700 p-3'
					}`}
				>
					<Flex align="center" gap={16}>
						<Avatar src={''} alt={''} radius="xl" size={32} />

						<Flex direction="column" gap={0}>
							<Text size="sm">
								{user?.firstName} {user?.lastName}
							</Text>
							<Text size="xs" c="gray">
								{user?.isAdmin ? 'Администратор' : 'Работник'}
							</Text>
						</Flex>
					</Flex>
				</UnstyledButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Настройки</Menu.Label>
				<Menu.Item
					component={NavLink}
					to={routes.profile}
					leftSection={
						<IoSettingsOutline style={{ width: '16px', height: '16px' }} />
					}
				>
					Профиль
				</Menu.Item>
				<Menu.Item
					onClick={logout}
					leftSection={
						<IoLogOutOutline style={{ width: '16px', height: '16px' }} />
					}
				>
					Выйти
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
