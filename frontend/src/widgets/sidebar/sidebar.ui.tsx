import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Flex } from '@mantine/core'
import { FaShieldAlt } from 'react-icons/fa'
import { menuLinks } from '@/shared/lib/config'
import { LogoutFeature } from '@/features/logout'

export const SidebarWidget = () => {
	const links = menuLinks.map((item) => (
		<NavLink
			className={({ isActive }) => {
				return clsx(
					'flex items-center text-sm font-medium px-2 py-2 rounded transition text-gray-700 hover:bg-gray-100 hover:text-black [&>*]:hover:text-black',
					isActive ? 'bg-blue-100 text-blue-600 [&>*]:text-blue-600' : '',
				)
			}}
			key={item.link}
			to={item.link}
		>
			<item.icon className="text-gray-500 dark:text-gray-400 mr-2 w-6 h-6" />
			<span>{item.label}</span>
		</NavLink>
	))

	return (
		<nav className="h-[100vh] w-[300px] p-4 flex flex-col border-r border-gray-300 dark:border-gray-700">
			<div className="flex-1">
				<div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-300 dark:border-gray-700">
					<FaShieldAlt className="w-8 h-8 text-blue-900" /> Logo
				</div>
				<Flex direction="column" gap={4}>
					{links}
				</Flex>
			</div>

			<div className="pt-4 py-2 mt-4 border-t border-gray-300">
				<LogoutFeature />
			</div>
		</nav>
	)
}
