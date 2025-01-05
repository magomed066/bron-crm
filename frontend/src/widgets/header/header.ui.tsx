import { UserInfoFeature } from '@/features/user-info'
import { menuLinks } from '@/shared/lib/config'
import {
	Container,
	Menu,
	Burger,
	Center,
	Flex,
	Box,
	Image,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IoChevronDown } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import Logo from '@/assets/logo.jpg'
import { useUserStore } from '@/entities/auth'

export const Header = () => {
	const [opened, { toggle }] = useDisclosure(false)
	const { user } = useUserStore()

	const items = menuLinks
		.filter((el) => el.roles.includes(+user?.isAdmin))
		.map((link) => {
			const menuItems = link.links
				? link.links.map((item) => (
						<Menu.Item key={item.link}>{item.label}</Menu.Item>
				  ))
				: []

			if (menuItems.length > 0) {
				return (
					<Menu
						key={link.label}
						trigger="hover"
						transitionProps={{ exitDuration: 0 }}
						withinPortal
					>
						<Menu.Target>
							<NavLink
								to={link.link}
								className="block leading-none px-3 py-2 rounded-sm text-gray-700 dark:text-gray-100 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
								onClick={(event) => event.preventDefault()}
							>
								<Center>
									<Flex align="center" gap={8}>
										<span>{link.label}</span>
										<IoChevronDown size="0.9rem" />
									</Flex>
								</Center>
							</NavLink>
						</Menu.Target>
						<Menu.Dropdown>{menuItems}</Menu.Dropdown>
					</Menu>
				)
			}

			return (
				<NavLink
					key={link.label}
					to={link.link}
					className={({ isActive }) => {
						return clsx(
							'block leading-none py-2 relative group rounded-sm text-gray-700 text-sm font-medium text-[17px]',
							isActive && '[&>div]:w-full',
						)
					}}
				>
					{link.label}

					<div className="bg-primary absolute w-0 bottom-0 left-0 right-0 h-0.5 group-hover:w-full transition-all" />
				</NavLink>
			)
		})

	return (
		<header className="h-20 mb-30 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
			<Container size="lg" fluid>
				<div className="h-20 flex items-center justify-between">
					<Flex align="center" justify="space-between" w="100%">
						<Image src={Logo} alt="logo" w={60} h={60} />

						<Flex gap={20} align="center" visibleFrom="sm">
							{items}
						</Flex>
					</Flex>

					<Box className="hidden md:block ml-5">
						<UserInfoFeature />
					</Box>

					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
				</div>
			</Container>
		</header>
	)
}
